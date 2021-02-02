import { Router } from "express";
import { homeServices } from "../services";

export const homeRouter = Router();

homeRouter.get("/", homeServices.home);
