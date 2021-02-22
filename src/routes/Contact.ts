import { Router } from "express";
import { contactServices } from "../services";

export const contactRouter = Router();

contactRouter.get("/contact", contactServices.contact);

contactRouter.post("/contactUs", contactServices.contactUs);
