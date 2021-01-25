import * as express from "express";
import { Authentication } from "../utils"
import { dashboardServices } from "../services";
export const dashboardRouter = express.Router();

// protected router
dashboardRouter.get("/dashboard", dashboardServices.to);
