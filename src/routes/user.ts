import * as express from "express";
import { Authentication } from "../utils";
import { userServices } from "../services";
export const userRouter = express.Router();

// protected route
userRouter.get("/signin", userServices.signin);

userRouter.post("/signin", userServices.postSignin);

// non protected route
userRouter.get("/signup", userServices.signup);

userRouter.post("/signup", userServices.postSignup);
