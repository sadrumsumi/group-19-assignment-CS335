import * as jwt from "jsonwebtoken";
import { Request } from "express";
import * as env from "dotenv";

env.config();
export class Extract {
  /** */
  static async token(req: Request): Promise<any> {
    const token = req.cookies.token;
    return Promise.resolve(await jwt.verify(token, process.env.LOGIN_SECRETE));
  }

  /** */
}
