const cron = require('node-cron');
const fs = require('fs');

const db = `${__dirname}/shrug.json`;
const countDir = `${__dirname}/counts/`;

cron.schedule('59 23 * * *', () => {
  const countsForTodayFilename = 
    `${new Date().toISOString().split('T')[0]}-counts.json`;
  const fullyQualifiedFilename = `${countDir}${countsForTodayFilename}`;

  console.log(`Saving counts for the day in ${fullyQualifiedFilename}`);

  fs.copyFileSync(db, fullyQualifiedFilename); 
});
