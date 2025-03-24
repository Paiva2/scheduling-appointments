import { Express } from "express";
import userRoutes from "./userRoutes";
import specialismRoutes from "./specialismRoutes";
import schedulingRoutes from "./schedulingRoutes";

export default function routesConfig(app: Express) {
  userRoutes(app);
  specialismRoutes(app);
  schedulingRoutes(app);
}
