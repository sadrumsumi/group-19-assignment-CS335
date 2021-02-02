import * as env from "dotenv";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

env.config();
export class Authentication {
  static async genarateToken(req: Request, res: Response, data): Promise<any> {
    try {
      const expiration = 3600000; // expire after 1h
      const token = jwt.sign(data, process.env.LOGIN_SECRETE, {
        expiresIn: "1h",
        algorithm: "HS256",
      });
      // if source is web
      return Promise.resolve({
        status: true,
        message: res.cookie("token", token, {
          expires: new Date(Date.now() + expiration),
          secure: false, // set to true if your using https
          httpOnly: true,
        }),
      });
    } catch (error) {
      return Promise.reject({ status: false, message: error.toString() });
    }
  }

  // check if user logout
  static logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token || "";
      console.log(!token)
      if (!token) {
        next();
      } else {
        res.redirect("/");
      }
    } catch (error) {
      res.render("error", { error: "" });
    }
  }

  /** */
  static async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const token = req.cookies.token || "";
      if (!token) {
        res.render("signin", { error: "You must log in first, to continue." });
      } else {
        await jwt.verify(token, process.env.LOGIN_SECRETE);
        next();
      }
    } catch (error) {
      return Promise.reject({ status: false, message: error.toString() });
    }
  }
}
