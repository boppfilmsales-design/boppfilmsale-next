const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  try {
    const html = await fetch('https://boppfilmsale-next.vercel.app/');
    if (html.includes('__NEXT_DATA__')) {
      console.log('__NEXT_DATA__ string found in HTML');
      // Find the position
      const pos = html.indexOf('__NEXT_DATA__');
      console.log('Position:', pos);
      // Show 100 chars before and after
      const start = Math.max(0, pos - 100);
      const end = Math.min(html.length, pos + 100);
      console.log('Context:', html.substring(start, end));
    } else {
      console.log('__NEXT_DATA__ string NOT found in HTML');
    }
    // Also check for the root div
    if (html.includes('<div id="__next">')) {
      console.log('Root div found');
    } else {
      console.log('Root div NOT found');
      // Maybe it's <div id="__next"></div> or with other attributes
      const divMatch = html.match(/<div[^>]*id="__next"[^>]*>/);
      if (divMatch) {
        console.log('Found div with id __next:', divMatch[0]);
      } else {
        console.log('No div with id __next found at all');
      }
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

main();