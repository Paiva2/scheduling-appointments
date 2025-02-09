import express, { Express } from "express";
import bodyParser from "body-parser";
import { pingDb } from "./infra/persistence/database/postgres/connection";

const app: Express = express();

app.use(bodyParser.json());

(async () => {
  await pingDb();
})();

export default app;
