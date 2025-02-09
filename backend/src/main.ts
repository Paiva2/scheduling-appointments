import express, { Express } from "express";
import bodyParser from "body-parser";
import { pingDb } from "./infra/persistence/database/postgres/connection";
import routesConfig from "./application/config/routes";

const app: Express = express();

app.use(bodyParser.json());

(async () => {
  await pingDb();
})();

export const apiVersionPrefix = "/api/v1";
routesConfig(app);

export default app;
