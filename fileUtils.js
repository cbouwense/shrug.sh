import fs from 'fs';

const promiseFs = fs.promises;
const db = `${process.cwd()}/shrug.json`;

export const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/views.shrug.sh/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/views.shrug.sh/fullchain.pem'),
};

export const addCopy = async (_req, res) => {
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
};

export const addView = async (_req, res) => {
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
};

export const getCurrentCounts = async (_req, res) => {
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
};