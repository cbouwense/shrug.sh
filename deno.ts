import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(({ response }) => {
   response.body = "Hello World!";
});

addEventListener("fetch", app.fetchEventHandler());