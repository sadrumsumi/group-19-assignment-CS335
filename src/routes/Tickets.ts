import { Router } from "express";
import * as express from "express";
import { ticketServices } from "../services";

export const ticketRouter = express.Router();

ticketRouter.get("/tickets", ticketServices.getPage);
