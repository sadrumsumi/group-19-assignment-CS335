import { Router } from "express";
import { activityService } from "../services";
import { Authentication } from "../utils";

export const activityRouter = Router();

// protected route
activityRouter.get(
  "/activity",
  Authentication.verifyToken,
  activityService.getPage
);
