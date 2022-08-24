import { Status } from "https://deno.land/x/oak/mod.ts";
const db = `${Deno.cwd()}/shrug.json`;

export const addCopy = async (ctx) => {
  console.log('GET /add-copy'); 
  try {
    // Read from file.
    const rawCountFile = await Deno.readTextFile(db);
    const jsonCountFile = JSON.parse(rawCountFile);
    
    // Increment view count by one.
    const oldCopyCount = jsonCountFile.copies;
    const newCopyCount = oldCopyCount + 1;
    const newCountFile = { 
      ...jsonCountFile,
      copies: newCopyCount 
    };

    // Write to the file.
    Deno.writeTextFileSync(db, JSON.stringify(newCountFile) + '\n');

    // Respond with OK.
    ctx.response.status = Status.OK;
  } catch (e) {
    console.error(e); 
    ctx.response.status = Status.InternalServerError;
  }
};

export const addView = async (ctx) => {
  console.log('GET /add-view'); 
  try {
    // Read from file.
    const rawCountFile = await Deno.readTextFile(db);
    const jsonCountFile = JSON.parse(rawCountFile);
    
    // Increment view count by one.
    const oldViewCount = jsonCountFile.views;
    const newViewCount = oldViewCount + 1;
    const newCountFile = { 
      ...jsonCountFile,
      views: newViewCount
    };

    // Write to the file.
    Deno.writeTextFileSync(db, JSON.stringify(newCountFile) + '\n');

    // Respond with OK.
    ctx.response.status = Status.OK;
  } catch (e) {
    console.error(e); 
    ctx.response.status = Status.InternalServerError;
  }
};

export const getCurrentCounts = async (ctx) => {
  console.log('GET /');

  try {
    // Read from file.
    const rawCountFile = await Deno.readTextFile(db);

    ctx.response.status = Status.OK;
    ctx.response.body = rawCountFile;
  } catch (e) {
    console.error(e);
    ctx.response.status = Status.InternalServerError;
  }
};