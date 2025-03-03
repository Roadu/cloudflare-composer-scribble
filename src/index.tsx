import {  Frog } from "frog";
import { devtools } from 'frog/dev'
import {serveStatic} from 'hono/serve-static';
import { Bindings } from "./secrets";

const title = "Scribble Composer Action";
const browserLocation = "https://cloudflare-composer-scribble.roadu.workers.dev";
const aboutUrlWorker = "https://github.com/roadu";

export const app = new Frog<{ Bindings: Bindings }>({
  browserLocation,
  title,
  verify: true,
});

app
  .composerAction(
    "/",
    async (c: any) => {
     /*  const { actionData } = c;
      const {
        fid,
        messageHash,
        timestamp,
        state: {
          cast: { text },
        },
      } = actionData; */

      const oneTimeUrl = `${browserLocation}/draw`;
      return c.res({ title, url: oneTimeUrl });
    },
    {
      name: "Scribble",
      description: "Sketch and send",
      icon: "pencil",
      aboutUrl: aboutUrlWorker,
      imageUrl:
        "https://scribbleonchain.com/icon-256.png",
    }
  )
  .hono.use("/draw", serveStatic({root: './public'}));



export default app;
