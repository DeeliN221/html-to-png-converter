import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  let browser;
  
  try {
    console.log('Starting HTML to PNG conversion...');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const width = parseInt(formData.get('width') as string) || 1920;
    const height = parseInt(formData.get('height') as string) || 1080;

    if (!file) {
      console.log('No file uploaded');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.name?.endsWith('.html')) {
      console.log('Invalid file type:', file.name);
      return NextResponse.json({ error: 'Only HTML files are allowed' }, { status: 400 });
    }

    // Read the HTML content
    const htmlContent = await file.text();
    console.log('HTML content length:', htmlContent.length);

    // Launch puppeteer with more compatible settings
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    console.log('Browser page created');
    
    // Set viewport
    await page.setViewport({ width, height });
    console.log('Viewport set to:', width, 'x', height);
    
    // Set content with a more lenient wait strategy
    await page.setContent(htmlContent, { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    });
    console.log('HTML content loaded');

    // Wait a bit more for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Take screenshot
    console.log('Taking screenshot...');
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true
    });
    console.log('Screenshot taken, size:', screenshot.length);

    await browser.close();
    browser = null;

    // Return the image
    return new NextResponse(screenshot, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${file.name.replace('.html', '.png')}"`,
      },
    });

  } catch (error) {
    console.error('Conversion error:', error);
    
    // Make sure to close browser if it's still open
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to convert HTML to PNG',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
