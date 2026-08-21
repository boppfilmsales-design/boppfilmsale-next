const https = require('https');

https.get('https://boppfilmsale-next.vercel.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const lower = data.toLowerCase();
    if (lower.includes('error')) {
      console.log('HTML contains error');
      // Show a snippet around the first error
      const idx = lower.indexOf('error');
      console.log('Context:', data.substring(Math.max(0, idx-100), idx+100));
    } else {
      console.log('No error found in HTML');
    }
  });
}).on('error', console.error);