import { Router } from "express";
import { Authentication } from "../utils";
import { paymentServices } from "../services";
export const paymentRouter = Router();

paymentRouter.get(
  "/payment",
  Authentication.verifyToken,
  paymentServices.getPage
);
