import * as env from "dotenv";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

env.config();
export class Authentication {
  static async genarateToken(req: Request, res: Response, data): Promise<any> {
    try {
      const { source } = req.params;
      const expiration = 7200000; // expire after two hour
      const token = jwt.sign(data, process.env.LOGIN_SECRETE, {
        expiresIn: "2h",
        algorithm: "HS256",
      });
      if (source == "android") {
        // if source is android
        return Promise.resolve({ status: true, message: token });
      } else {
        // if source is web
        return Promise.resolve({
          status: true,
          message: res.cookie("token", token, {
            expires: new Date(Date.now() + expiration),
            secure: false, // set to true if your using https
            httpOnly: true,
          }),
        });
      }
    } catch (error) {
      return Promise.reject({ status: false, message: error.toString() });
    }
  }

  /** */
  static async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const token = req.cookies.token || "";
    try {
      if (!token) {
        return Promise.resolve({
          status: false,
          message: "You need to login first.",
        });
      } else {
        let decode = await jwt.verify(token, process.env.LOGIN_SECRETE);
        next();
      }
    } catch (error) {
      return Promise.reject({ status: false, message: error.toString() });
    }
  }
}
