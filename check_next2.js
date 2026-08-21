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
    console.log('First 2000 chars:');
    console.log(html.substring(0, 2000));
    console.log('---');
    // Search for __NEXT_DATA__ with regex
    const match = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>/);
    if (match) {
      console.log('Found __NEXT_DATA__ script tag:', match[0]);
    } else {
      console.log('No __NEXT_DATA__ script tag found');
    }
    // Look for any script tag
    const scriptMatches = html.match(/<script[^>]*>/g);
    if (scriptMatches) {
      console.log('Number of script tags:', scriptMatches.length);
      for (let i = 0; i < Math.min(scriptMatches.length, 5); i++) {
        console.log(`Script ${i}:`, scriptMatches[i]);
      }
    } else {
      console.log('No script tags found');
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

main();