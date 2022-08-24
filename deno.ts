import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { addCopy, addView, getCurrentCounts } from './fileUtils.ts';

const router = new Router();

console.log(Deno.cwd())
for await (const dirEntry of Deno.readDir(Deno.cwd())) {
  console.log(dirEntry.name);
}

router.get("/", getCurrentCounts);
router.get('/add-copy', addCopy);
router.get('/add-view', addView);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 1738 });