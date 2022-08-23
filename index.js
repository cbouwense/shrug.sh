const express = require('express');
const http = require('http');
const https = require('https');
const app = express();
const fs = require('fs');
const cors = require('cors');

const promiseFs = fs.promises;

const port = 1738;
const db = `${__dirname}/shrug.json`;

app.use(cors({ origin: 'https://shrug.sh:443' }));

app.get('/', async (req, res) => {
  console.log('GET /'); 
  try {
    // Read from file.
    const rawViewCountFile = await promiseFs.readFile(db, 'utf-8');
    
    // Increment view count by one.
    const jsonViewCountFile = JSON.parse(rawViewCountFile);
    const oldViewCount = jsonViewCountFile.views;
    const newViewCount = oldViewCount + 1;
    const newViewCountFile = { views: newViewCount };

    // Write to the file.
    await promiseFs.writeFile(db, JSON.stringify(newViewCountFile) + '\n');

    // Respond with OK.
    res.sendStatus(200);
  } catch (e) {
    console.error(e); 
    res.status(500).send('Encountered error while updating view count');
  }
});

app.get('/views', async (req, res) => {
  console.log('GET /views');

  try {
    // Read from file.
    const rawViewCountFile = await promiseFs.readFile(db, 'utf-8');

    // Parse view count.
    const jsonViewCountFile = JSON.parse(rawViewCountFile);
    const currentViewCount = jsonViewCountFile.views;

    res.status(200).send(rawViewCountFile);
  } catch (e) {
    console.error(e);
    res.status(500).send('Encountered error while finding view count');
  }
});

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/views.shrug.sh/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/views.shrug.sh/fullchain.pem'),
};

http.createServer(app).listen(1737, () => { console.log('Started HTTP server on port 1737') });
https.createServer(sslOptions, app).listen(1738, () => { console.log('Started HTTPS server on port 1738') } );
// app.listen(port, () => { console.log(`View counter listening on port ${port}`); });

