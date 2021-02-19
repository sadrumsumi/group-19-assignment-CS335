import { Router } from "express";
import { Authentication } from "../utils";
import { ownerServices } from "../services";

export const owneRouter = Router();

owneRouter.get("/owners", Authentication.verifyToken, ownerServices.getPage);

owneRouter.post(
  "/addOwner",
  Authentication.verifyToken,
  ownerServices.addOwner
);
