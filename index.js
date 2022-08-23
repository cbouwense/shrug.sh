const express = require('express');
const http = require('http');
const https = require('https');
const app = express();
const fs = require('fs');
const cors = require('cors');

const promiseFs = fs.promises;

const port = 1738;
const db = `${__dirname}/shrug.json`;

app.use(cors({ origin: 'https://shrug.sh' }));

app.get('/add-view', async (req, res) => {
  console.log('GET /add-view'); 
  try {
    // Read from file.
    const rawCountFile = await promiseFs.readFile(db, 'utf-8');
    
    // Increment view count by one.
    const jsonCountFile = JSON.parse(rawCountFile);
    const oldViewCount = jsonCountFile.views;
    const newViewCount = oldViewCount + 1;
    const newCountFile = { 
      ...jsonCountFile,
      views: newViewCount
    };

    // Write to the file.
    await promiseFs.writeFile(db, JSON.stringify(newCountFile) + '\n');

    // Respond with OK.
    res.sendStatus(200);
  } catch (e) {
    console.error(e); 
    res.status(500).send('Encountered error while updating view count');
  }
});

app.get('/add-copy', async (req, res) => {
  console.log('GET /add-copy'); 
  try {
    // Read from file.
    const rawCountFile = await promiseFs.readFile(db, 'utf-8');
    
    // Increment view count by one.
    const jsonCountFile = JSON.parse(rawCountFile);
    const oldCopyCount = jsonCountFile.copies;
    const newCopyCount = oldCopyCount + 1;
    const newCountFile = { 
      ...jsonCountFile,
      copies: newCopyCount 
    };

    // Write to the file.
    await promiseFs.writeFile(db, JSON.stringify(newCountFile) + '\n');

    // Respond with OK.
    res.sendStatus(200);
  } catch (e) {
    console.error(e); 
    res.status(500).send('Encountered error while updating copy count');
  }
});

app.get('/', async (req, res) => {
  console.log('GET /');

  try {
    // Read from file.
    const rawViewCountFile = await promiseFs.readFile(db, 'utf-8');

    // Parse view count.
    const jsonViewCountFile = JSON.parse(rawViewCountFile);
    const currentViewCount = jsonViewCountFile.views;

    res.status(200).send(rawViewCountFile);
  } catch (e) {
    console.error(e);
    res.status(500).send('Encountered error while finding counts');
  }
});

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/views.shrug.sh/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/views.shrug.sh/fullchain.pem'),
};
const httpsPort = 1738;

https
  .createServer(sslOptions, app)
  .listen(
    httpsPort, 
    () => { 
      console.log(`Started HTTPS server on port ${httpsPort}`);
    }
  );

