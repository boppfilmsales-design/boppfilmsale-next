const https = require('https');
const opts = { hostname: 'boppfilmsale-next.vercel.app', port: 443, path: '/', method: 'GET' };
const req = https.request(opts, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const langMatch = data.match(/<html lang="([^"]+)"/);
    console.log('HTML lang:', langMatch ? langMatch[1] : 'not found');
    console.log(data.substring(0, 500));
  });
});
req.on('error', err => console.error('Error:', err.message));
req.setTimeout(15000, () => { console.log('Timeout'); req.destroy(); });
req.end();