import { Router } from "express";
import { ticketServices } from "../services";

export const ticketRouter = Router();

ticketRouter.get("/ticket", ticketServices.getPage);
