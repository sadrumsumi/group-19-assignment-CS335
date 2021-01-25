import * as express from "express";
import { homeServices } from "../services";
export const homeRouter = express.Router();

homeRouter.get("/", homeServices.home);