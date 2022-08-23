const express = require('express');
const app = express();
const promiseFs = require('fs').promises;

const port = 1738;
const db = `${__dirname}/shrug.json`;

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

app.listen(port, () => { console.log(`View counter listening on port ${port}`); });

