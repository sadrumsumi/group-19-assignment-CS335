import * as env from "dotenv";
import * as jwt from "jsonwebtoken";

import { Response, Request } from "express";

env.config();
export class homeServices {
  /** */
  static async home(req: Response, res: Request) {
    try {
      // extract token
      const token = req.cookies.token || "";
      if (token == "") {
        res.render("home", { data: [] });
      } else {
        // validate token
        const { role } = await jwt.verify(token, process.env.LOGIN_SECRETE);

        // redirect to admin dashboard
        if (role.split(",").includes("admin")) {
          res.render("dashboard/admin", { data: [] });
        }
        // redirect to owner dashboard
        else if (role.split(",").includes("owner")) {
          res.render("dashboard/owner", { data: [] });
        }
        // redirect to agent dashboard
        else if (role.split(",").includes("agent")) {
          res.render("dashboard/agent", { data: [] });
        }
        // redirect to manager dashboard
        else if (role.split(",").includes("manager")) {
          res.render("dashboard/manager", { data: [] });
        }
        // redirect to customer dashboard
        else if (role.split(",").includes("customer")) {
          res.render("dashboard/customer", { data: [] });
        }
      }
    } catch (error) {
      res.render("error", { error: "Somethings went wrong, try again later." });
    }
  }

  /** */
}
