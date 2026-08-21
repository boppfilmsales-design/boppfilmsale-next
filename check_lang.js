const https = require('https');

https.get('https://boppfilmsale-next.vercel.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (data.includes('lang="xyz"')) {
      console.log('Lang attribute is xyz');
    } else if (data.includes('lang="en"')) {
      console.log('Lang attribute is en');
    } else if (data.includes('lang=')) {
      // find the lang attribute
      const match = data.match(/lang="[^"]*"/);
      if (match) {
        console.log('Lang attribute found:', match[0]);
      } else {
        console.log('No lang attribute found');
      }
    } else {
      console.log('No lang attribute at all');
    }
  });
}).on('error', console.error);