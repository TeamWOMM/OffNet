const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');
const crawler = require('crawler-request');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    path: '/api/socket.io', // ✅ Fixed WebSocket path
    cors: {
        origin: "http://localhost:4000", // Ensure correct frontend port
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());

const DATA_DIR = path.join(__dirname, 'data');
const SCRAPES_FILE = path.join(DATA_DIR, 'scrapes.json');

// ✅ Ensure storage exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(SCRAPES_FILE)) fs.writeFileSync(SCRAPES_FILE, JSON.stringify([], null, 2));

// ✅ Prevent rapid emits by tracking last emission time
let lastEmitTime = 0;
const EMIT_DELAY = 3000; // ⏳ Minimum 3 seconds between emits

// 📌 Generate Unique ID Without `uuid`
const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

// 📄 Parse and store PDFs
const parseAndStorePdf = async (pdfLink) => {
    const scrapes = JSON.parse(fs.readFileSync(SCRAPES_FILE));
    if (scrapes.some(entry => entry.pdflink === pdfLink)) return;

    try {
        console.log(`📄 Downloading & parsing: ${pdfLink}`);
        const response = await crawler(pdfLink);
        if (!response.text) throw new Error("Empty PDF response");

        const pdfData = {
            resource_id: generateUniqueId(),
            resource_name: pdfLink.split('/').pop(),
            link: `http://localhost:5000/resource/${pdfLink.split('/').pop()}`
        };

        scrapes.push(pdfData);
        fs.writeFileSync(SCRAPES_FILE, JSON.stringify(scrapes, null, 2));

        // ✅ Prevent rapid emits
        const now = Date.now();
        if (now - lastEmitTime > EMIT_DELAY) {
            lastEmitTime = now;
            io.emit("scrape_result", scrapes);
        }
    } catch (error) {
        console.error(`❌ Error parsing PDF: ${pdfLink}`, error.message);
    }
};

// 🔍 Scrape PDFs from Bing
const scrapePDFs = async (query) => {
    let page = null;
    try {
        console.log(`🔍 Processing query: ${query}`);
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
        page = await browser.newPage();

        await page.goto(`https://www.bing.com/search?q=${encodeURIComponent(query + " filetype:pdf")}`, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        const pdfLinks = await page.evaluate(() => {
            return [...new Set([...document.querySelectorAll('a')]
                .map(a => a.href)
                .filter(href => href?.toLowerCase().endsWith('.pdf')))]
                .slice(0, 5);
        });

        console.log(`✅ Found ${pdfLinks.length} PDFs`);
        pdfLinks.forEach(parseAndStorePdf);
    } catch (error) {
        console.error(`❌ Error processing query: ${error.message}`);
    } finally {
        if (page) await page.close();
    }
};

// 📡 WebSocket Connection Handling
io.on('connection', (socket) => {
    console.log("⚡ Client connected");

    // ✅ Send existing resources
    const scrapes = JSON.parse(fs.readFileSync(SCRAPES_FILE));
    socket.emit("existing_resources", scrapes);

    socket.on('new_query', async (data) => {
        await scrapePDFs(data.query);
    });

    socket.on('message', (msg) => {
        if (msg === 'tableData') {
            const scrapes = JSON.parse(fs.readFileSync(SCRAPES_FILE));
            socket.emit("scrape_result", scrapes);
        }
    });
});

// 🧹 Cleanup
process.on('SIGINT', async () => {
    process.exit(0);
});

// 🔄 Start Server
server.listen(5000, () => console.log(`🚀 Server running on http://localhost:5000`));
