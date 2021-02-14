import * as express from "express";
import { ticketServices } from "../services";

export const ticketRouter = express.Router();

ticketRouter.get("/ticket", ticketServices.getPage);
