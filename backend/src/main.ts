import "express-async-errors";
import express, { Express } from "express";
import { pingDb } from "./infra/persistence/database/postgres/connection";
import globalExceptionHandler from "./application/middleware/globalExceptionHandler";
import routesConfig from "./application/config/routes";
import bodyParser from "body-parser";
import cors from "cors";

export const apiVersionPrefix = "/api/v1";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

routesConfig(app);
app.use(globalExceptionHandler);

(async () => {
  await pingDb();
})();

export default app;
