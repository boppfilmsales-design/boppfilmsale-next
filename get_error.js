const https = require('https');

https.get('https://boppfilmsale-next.vercel.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('$undefined');
    if (idx !== -1) {
      console.log('Found $undefined at index', idx);
      const start = Math.max(0, idx - 300);
      const end = Math.min(data.length, idx + 300);
      console.log('Context:');
      console.log(data.substring(start, end));
    } else {
      console.log('$undefined not found');
      // Maybe the error is rendered differently
      if (data.includes('error')) {
        console.log('But error string found');
        const eIdx = data.indexOf('error');
        const start = Math.max(0, eIdx - 200);
        const end = Math.min(data.length, eIdx + 200);
        console.log('Error context:', data.substring(start, end));
      }
    }
  });
}).on('error', console.error);