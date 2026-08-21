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
      console.log('__NEXT_DATA__ found');
    } else {
      console.log('__NEXT_DATA__ NOT found');
    }
    // Also check for any error messages in the HTML
    if (html.includes('error') || html.includes('Error')) {
      console.log('HTML contains error keyword');
    }
    // Check for React devtools hint
    if (html.includes('react-devtools')) {
      console.log('React devtools hint present');
    }
    // Check for the root div
    if (html.includes('<div id="__next">')) {
      console.log('Root div found');
    } else {
      console.log('Root div NOT found');
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

main();