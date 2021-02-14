import { Router } from "express";
import * as multer from "multer";
import { Storage } from "../utils";
import { Authentication } from "../utils";
import { movieServices } from "../services";

export const movieRouter = Router();
/** */
movieRouter.get("/movie", Authentication.verifyToken, movieServices.getPage);

/** */
movieRouter.post(
  "/movie",
  multer({ storage: Storage.video() }).single("video"),
  movieServices.addMovie
);
