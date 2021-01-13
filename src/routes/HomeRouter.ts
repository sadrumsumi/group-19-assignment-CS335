import * as express from "express";
import { HomeServices } from "../services";
export const homeRouter = express.Router();

homeRouter.get("/", HomeServices.home);