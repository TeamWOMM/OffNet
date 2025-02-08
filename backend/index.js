// const express = require('express');
// const { Server } = require('socket.io');
const http = require('http');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');
const path = require('path');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000, path: '/api' });

puppeteer.use(StealthPlugin());

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

let pendingRequests = [
    { id: 1, query: "machine learning" },
    { id: 2, query: "deep learning" },
    { id: 3, query: "artificial intelligence" }
];

const processedRequests = new Set();
let isProcessing = false;
let browser = null;

// Detect Edge browser path
const getEdgePath = () => {
    const edgePaths = {
        win32: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        win64: "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
        linux: "/usr/bin/microsoft-edge",
        darwin: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
    };
    return edgePaths[process.platform] || null;
};

// Check Bing availability before scraping
const checkBingAvailability = async () => {
    try {
        await axios.get('https://www.bing.com', { timeout: 5000 });
        return true;
    } catch (error) {
        console.error("❌ Bing is unreachable:", error.message);
        return false;
    }
};

// Initialize Puppeteer with Microsoft Edge
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

// Scrape PDFs from Bing
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

        console.log(`✅ Found ${pdfLinks.length} PDF links for "${query}":`, pdfLinks);
        return pdfLinks;
    } catch (error) {
        console.error(`❌ Error processing query "${query}":`, error.message);
        return [];
    } finally {
        if (page) await page.close();
    }
};

// Process Pending Requests
const processPendingRequests = async () => {
    if (isProcessing) return;
    try {
        isProcessing = true;

        if (await checkBingAvailability()) {
            for (let request of pendingRequests) {
                if (!processedRequests.has(request.query)) {
                    const links = await scrapePDFs(request.query);
                    if (links.length > 0) {
                        processedRequests.add(request.query);
                        io.emit("scrape_result", { query: request.query, links });
                    }
                }
            }
        }
    } catch (error) {
        console.error("❌ Error in processing requests:", error.message);
    } finally {
        isProcessing = false;
    }
};

// WebSocket to Receive New Queries
// io.on('connection', (socket) => {
//     console.log("⚡ New client connected!");

//     socket.on('new_query', (data) => {
//         console.log(`📩 Received new query: ${data.query}`);

//         const newRequest = { id: pendingRequests.length + 1, query: data.query };
//         pendingRequests.push(newRequest);

//         processPendingRequests();
//     });

//     socket.on('disconnect', () => {
//         console.log("🔌 Client disconnected.");
//     });
// });

// Cleanup Function
const cleanup = async () => {
    if (browser) {
        await browser.close();
        browser = null;
    }
    process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start Periodic Processing
const INTERVAL = 5000;
setInterval(processPendingRequests, INTERVAL);

// const PORT = 5000;
// server.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });



wss.on('connection', function connection(ws) {
    console.log('A new client connected');
  
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      ws.send('Hello Client!');
    });
  
    ws.on('close', function close() {
      console.log('Client disconnected');
    });
  
    ws.on('error', function error(err) {
      console.error('WebSocket error: ', err);
    });
  });