import { Router } from "express";
import { Authentication } from "../utils";
import { userServices } from "../services";

export const userRouter = Router();

// non protected route
userRouter.get("/signup", userServices.signup);

//
userRouter.post("/signin", userServices.postSignin);

//
userRouter.post("/signup", userServices.postSignup);

// protected route
userRouter.get("/logout", Authentication.login, userServices.logout);

// protected route
userRouter.get("/signin", Authentication.logout, userServices.signin);
