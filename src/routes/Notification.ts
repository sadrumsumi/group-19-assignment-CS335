import { Router } from "express";
import { notificationServices } from "../services";

export const notificatinRouter = Router();

notificatinRouter.get("/notification", notificationServices.getPage);
