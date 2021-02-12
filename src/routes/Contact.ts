import { Router } from "express";
import { contactServices } from "../services";

export const contactRouter = Router();

contactRouter.post("/contactUs", contactServices.contactUs);
