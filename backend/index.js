const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');

puppeteer.use(StealthPlugin());

const pendingRequests = { 1: "machine learning", 2: "deep learning", 3: "artificial intelligence" };
const processedRequests = new Set();
let isProcessing = false;
let browser = null;

const checkBingAvailability = async () => {
    try {
        await axios.get('https://www.bing.com', { timeout: 5000 });
        return true;
    } catch (error) {
        console.error("Bing is unreachable:", error.message);
        return false;
    }
};

const initBrowser = async () => {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    return browser;
};

const scrapePDFs = async (query) => {
    let page = null;
    try {
        console.log(`Processing query: ${query}`);
        const browser = await initBrowser();
        page = await browser.newPage();

        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        await page.setRequestInterception(true);

        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet') {
                req.abort();
            } else {
                req.continue();
            }
        });

        const searchURL = `https://www.bing.com/search?q=${encodeURIComponent(query + " filetype:pdf")}`;
        await page.goto(searchURL, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        const pdfLinks = await page.evaluate(() => {
            return [...new Set([...document.querySelectorAll('a')]
                .map(a => a.href)
                .filter(href => href?.toLowerCase().endsWith('.pdf')))]
                .slice(0, 5);
        });

        console.log(`Found ${pdfLinks.length} PDF links for "${query}":`, pdfLinks);
        return pdfLinks;
    } catch (error) {
        console.error(`Error processing query "${query}":`, error.message);
        return [];
    } finally {
        if (page) await page.close();
    }
};

const processPendingRequests = async () => {
    if (isProcessing) return;
    try {
        isProcessing = true;

        if (await checkBingAvailability()) {
            for (const [id, query] of Object.entries(pendingRequests)) {
                if (!processedRequests.has(query)) {
                    const links = await scrapePDFs(query);
                    if (links.length > 0) {
                        processedRequests.add(query);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error in processing requests:", error.message);
    } finally {
        isProcessing = false;
    }
};

const cleanup = async () => {
    if (browser) {
        await browser.close();
        browser = null;
    }
    process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

const INTERVAL = 5000;
setInterval(processPendingRequests, INTERVAL);
console.log(`Scraper started. Checking Bing availability every ${INTERVAL/1000} seconds...`);