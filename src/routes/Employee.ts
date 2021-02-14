import { Router } from "express";
import { Authentication } from "../utils";
import { employeeServices } from "../services";

export const employeeRouter = Router();

employeeRouter.get(
  "/employee",
  Authentication.verifyToken,
  employeeServices.getPage
);

employeeRouter.get(
  "/employee-add",
  Authentication.verifyToken,
  employeeServices.getCustomer
);
