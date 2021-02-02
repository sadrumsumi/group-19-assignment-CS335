import { Router } from "express";
import { paymentServices } from "../services";
export const paymentRouter = Router();

paymentRouter.get("/payment", paymentServices.getPage);
