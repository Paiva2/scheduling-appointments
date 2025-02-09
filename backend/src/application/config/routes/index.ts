import { Express } from "express";
import userRoutes from "./userRoutes";

export default function routesConfig(app: Express) {
  userRoutes(app);
}
