import { Express } from "express";
import userRoutes from "./userRoutes";
import specialismRoutes from "./specialismRoutes";

export default function routesConfig(app: Express) {
  userRoutes(app);
  specialismRoutes(app);
}
