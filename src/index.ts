import "reflect-metadata";
import "ejs";
import * as path from "path";
import * as morgan from "morgan";
import * as express from "express";
import { createConnection } from "typeorm";
import * as bodyParser from "body-parser";
import * as createError from "http-errors";
import * as cookieParser from "cookie-parser";
import { NextFunction, Request, Response } from "express";

import * as env from "dotenv";
import { Logger } from "./config";
import { Routes } from "./routes";

env.config();

export default (async function () {
  try {
    // wait for database connections
    await createConnection();

    // create express app
    const app = express();
    app.set("port", 8888);
    app.use(morgan("dev"));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(
      express.static(path.join(__dirname, "../node_modules/bootstrap/dist"))
    );

    // view engine configurations
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");

    // routes
    Routes.forEach((e) => {
      app.use("/", e);
    });

    // catch 404 and forward to error handler
    app.use(function (req: Request, res: Response, next: NextFunction) {
      Logger.error(
        `[${req.ip}][${req.method}] ${req.originalUrl} ${
          req.method == "POST" ? "\n\r" + JSON.stringify(req.body) : ""
        }`
      );
      next(createError(404));
    });

    // error handler
    app.use(function (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      Logger.error(err);
      res.send({ status: err.status || 500, message: err.message });
    });

    // start express server
    let server: any = app.listen(app.get("port"), function () {
      let port: number = server.address().port;
      Logger.info(`Cinema project init on: http://localhost:${port}`);
    });

    return Promise.resolve(app);
  } catch (error) {
    Logger.error(error);
  }
})();
