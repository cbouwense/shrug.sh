import express from 'express';
import https from 'https';
import cors from 'cors';
import { addCopy, addView, getCurrentCounts, sslOptions } from './fileUtils.js';

const app = express();

app.use(cors({ origin: 'https://shrug.sh' }));
app.get('/', getCurrentCounts);
app.get('/add-copy', addCopy);
app.get('/add-view', addView);

const httpsPort = 1738;

https
  .createServer(sslOptions, app)
  .listen(
    httpsPort, 
    () => { 
      console.log(`Started HTTPS server on port ${httpsPort}`);
    }
  );
