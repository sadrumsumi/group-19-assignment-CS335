import { Router } from "express";
import { ownerServices } from "../services";
export const owneRouter = Router();

owneRouter.get("/owners", ownerServices.getPage);

owneRouter.post("/addOwner", ownerServices.addOwner);
