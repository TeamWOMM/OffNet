import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dns from 'dns';

// Constants
const PUBLIC_PDF_DIR = path.join(process.cwd(), 'public', 'pdfs');
const INFO_FILE = path.join(PUBLIC_PDF_DIR, 'info.json');
const QUEUE_FILE = path.join(PUBLIC_PDF_DIR, 'queue.json');

// Ensure PDF directory exists and create necessary files
if (!fs.existsSync(PUBLIC_PDF_DIR)) {
  fs.mkdirSync(PUBLIC_PDF_DIR, { recursive: true });
}

if (!fs.existsSync(INFO_FILE)) {
  fs.writeFileSync(INFO_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(QUEUE_FILE)) {
  fs.writeFileSync(QUEUE_FILE, JSON.stringify([], null, 2));
}

async function downloadPDF(url, filepath) {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  try {
    const response = await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    const buffer = await response.buffer();
    fs.writeFileSync(filepath, buffer);

    await browser.close();
    return true;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function findFirstPDFLink(query) {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.bing.com/search?q=${encodeURIComponent(query + " filetype:pdf")}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    const pdfLink = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const pdfLink = links.find(link => link.href?.toLowerCase().endsWith('.pdf'));
      return pdfLink ? pdfLink.href : null;
    });

    await browser.close();
    return pdfLink;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function checkInternetConnection() {
  return new Promise((resolve) => {
    dns.lookup('google.com', (err) => {
      resolve(!err);
    });
  });
}

async function processQueue() {
  const isOnline = await checkInternetConnection();
  if (!isOnline) return;

  const queue = JSON.parse(fs.readFileSync(QUEUE_FILE));
  if (queue.length === 0) return;

  for (const request of queue) {
    try {
      const pdfLink = await findFirstPDFLink(request.learnAbout);
      if (pdfLink) {
        const filename = `${uuidv4()}.pdf`;
        const filepath = path.join(PUBLIC_PDF_DIR, filename);
        await downloadPDF(pdfLink, filepath);

        const info = JSON.parse(fs.readFileSync(INFO_FILE));
        info.push({
          domain: request.learnAbout,
          actualLink: pdfLink,
          localLink: `public/pdfs/${filename}`,
        });
        fs.writeFileSync(INFO_FILE, JSON.stringify(info, null, 2));
      }
    } catch (error) {
      console.error(`Failed to process queued request: ${error.message}`);
    }
  }

  fs.writeFileSync(QUEUE_FILE, JSON.stringify([], null, 2));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { learnAbout } = body;

    if (!learnAbout) {
      return NextResponse.json(
        { success: false, message: 'Missing learnAbout parameter' },
        { status: 400 }
      );
    }

    const isOnline = await checkInternetConnection();

    if (!isOnline) {
      const queue = JSON.parse(fs.readFileSync(QUEUE_FILE));
      queue.push({
        learnAbout,
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));

      return NextResponse.json({
        success: true,
        status: 'queued',
        message: 'Request queued due to no internet connection'
      });
    }

    const pdfLink = await findFirstPDFLink(learnAbout);
    
    if (!pdfLink) {
      return NextResponse.json(
        { success: false, message: 'No PDF found' },
        { status: 404 }
      );
    }

    const filename = `${uuidv4()}.pdf`;
    const filepath = path.join(PUBLIC_PDF_DIR, filename);
    await downloadPDF(pdfLink, filepath);

    const publicUrl = `/pdfs/${filename}`;

    const info = JSON.parse(fs.readFileSync(INFO_FILE));
    info.push({
      learnAbout,
      originalPdfLink: pdfLink,
      localPdfUrl: publicUrl,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(INFO_FILE, JSON.stringify(info, null, 2));

    processQueue();

    return NextResponse.json({
      success: true,
      data: {
        originalPdfLink: pdfLink,
        localPdfUrl: publicUrl
      }
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing request', error: error.message },
      { status: 500 }
    );
  }
}



export async function GET(request) {  // Added request parameter
  try {
    const info = JSON.parse(fs.readFileSync(INFO_FILE));
    const queue = JSON.parse(fs.readFileSync(QUEUE_FILE));

    return new NextResponse(JSON.stringify({
      success: true,
      data: {
        savedPdfs: info,
        pendingRequests: queue
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({
      success: false,
      message: 'Error reading PDF information'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}