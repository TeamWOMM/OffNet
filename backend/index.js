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
    path: '/api',
    cors: {
        origin: "http://localhost:5000", // ✅ Frontend compatibility
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());

// 📂 Persistent Storage
const DATA_DIR = path.join(__dirname, 'data');
const REQUESTS_FILE = path.join(DATA_DIR, 'requests.json');
const SCRAPES_FILE = path.join(DATA_DIR, 'scrapes.json');
const RESOURCES_DIR = path.join(__dirname, 'resources');

// ✅ Ensure directories & files exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(REQUESTS_FILE)) fs.writeFileSync(REQUESTS_FILE, JSON.stringify([], null, 2));
if (!fs.existsSync(SCRAPES_FILE)) fs.writeFileSync(SCRAPES_FILE, JSON.stringify([], null, 2));
if (!fs.existsSync(RESOURCES_DIR)) fs.mkdirSync(RESOURCES_DIR, { recursive: true });

// ✅ Load pending requests
let pendingRequests = JSON.parse(fs.readFileSync(REQUESTS_FILE));
const processedRequests = new Set();
let isProcessing = false;
let browser = null;

// 🖥 Detect Microsoft Edge browser
const getEdgePath = () => {
    const edgePaths = {
        win32: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        win64: "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
        linux: "/usr/bin/microsoft-edge",
        darwin: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
    };
    return edgePaths[process.platform] || null;
};

// 🌐 Check if Bing is available
const checkBingAvailability = async () => {
    try {
        await axios.get('https://www.bing.com', { timeout: 5000 });
        return true;
    } catch (error) {
        console.error("❌ Bing is unreachable:", error.message);
        return false;
    }
};

// 🏁 Initialize Puppeteer with Microsoft Edge
const initBrowser = async () => {
    if (!browser) {
        browser = await puppeteer.launch({
            executablePath: getEdgePath(),
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    return browser;
};

// 📌 Generate Unique ID Without `uuid` Module
const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
};

// 🛠 Check if a PDF link is already cached
const isPdfCached = (pdfLink) => {
    const scrapes = JSON.parse(fs.readFileSync(SCRAPES_FILE));
    return scrapes.some(entry => entry.pdflink === pdfLink);
};

// 📄 Download & Store PDF in `/resources`
const downloadPdf = async (pdfLink, pdfName) => {
    try {
        const response = await axios({
            method: 'GET',
            url: pdfLink,
            responseType: 'stream'
        });

        const filePath = path.join(RESOURCES_DIR, pdfName);
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(filePath));
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`❌ Error downloading PDF: ${pdfLink}`, error.message);
    }
};

// 📄 Parse & Store PDF with Download Link
const parseAndStorePdf = async (pdfLink) => {
    if (isPdfCached(pdfLink)) {
        console.log(`🔹 Skipping cached PDF: ${pdfLink}`);
        return;
    }

    try {
        console.log(`📄 Downloading & parsing: ${pdfLink}`);
        const pdfName = pdfLink.split('/').pop();
        const localFilePath = await downloadPdf(pdfLink, pdfName);

        if (!localFilePath) throw new Error("Failed to download PDF");

        const pdfData = {
            resource_id: generateUniqueId(),
            resource_name: pdfName,
            link: `http://localhost:5000/resource/${pdfName}`
        };

        const scrapes = JSON.parse(fs.readFileSync(SCRAPES_FILE));
        scrapes.push(pdfData);
        fs.writeFileSync(SCRAPES_FILE, JSON.stringify(scrapes, null, 2));

        console.log(`✅ Stored PDF: ${pdfName}`);

        // 🔥 Notify frontend
        io.emit("scrape_result", pdfData);
    } catch (error) {
        console.error(`❌ Error parsing PDF: ${pdfLink}`, error.message);
    }
};

// 🔍 Scrape PDFs from Bing
const scrapePDFs = async (query) => {
    let page = null;
    try {
        console.log(`🔍 Processing query: ${query}`);
        const browser = await initBrowser();
        page = await browser.newPage();

        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        await page.setRequestInterception(true);

        page.on('request', (req) => {
            if (['image', 'stylesheet'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        const searchURL = `https://www.bing.com/search?q=${encodeURIComponent(query + " filetype:pdf")}`;
        await page.goto(searchURL, { waitUntil: 'networkidle0', timeout: 30000 });

        const pdfLinks = await page.evaluate(() => {
            return [...new Set([...document.querySelectorAll('a')]
                .map(a => a.href)
                .filter(href => href?.toLowerCase().endsWith('.pdf')))]
                .slice(0, 5);
        });

        console.log(`✅ Found ${pdfLinks.length} PDFs for "${query}"`);

        // ✅ Process PDFs asynchronously
        pdfLinks.forEach(parseAndStorePdf);
    } catch (error) {
        console.error(`❌ Error processing query "${query}":`, error.message);
    } finally {
        if (page) await page.close();
    }
};

// 🚀 Process Pending Requests
const processPendingRequests = async () => {
    if (isProcessing) return;
    try {
        isProcessing = true;

        if (await checkBingAvailability()) {
            for (let request of pendingRequests) {
                if (!processedRequests.has(request.query)) {
                    await scrapePDFs(request.query);
                    processedRequests.add(request.query);
                }
            }
        }
    } catch (error) {
        console.error("❌ Error processing requests:", error.message);
    } finally {
        isProcessing = false;
    }
};

// 📡 WebSocket Events
io.on('connection', (socket) => {
    console.log("⚡ Client connected");
    socket.on('new_query', (data) => {
        pendingRequests.push({ id: pendingRequests.length + 1, query: data.query });
        processPendingRequests();
    });

    // Send existing scraped resources when a client connects
    const scrapes = JSON.parse(fs.readFileSync(SCRAPES_FILE));
    socket.emit("existing_resources", scrapes);
});

// 📂 Serve Static Files
app.use('/resource', express.static(RESOURCES_DIR));

// 🧹 Cleanup
process.on('SIGINT', async () => {
    if (browser) await browser.close();
    process.exit(0);
});

// 🔄 Start Processing
setInterval(processPendingRequests, 5000);
server.listen(5000, () => console.log(`🚀 Server running on http://localhost:5000`));
