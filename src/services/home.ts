import * as env from "dotenv";
import * as jwt from "jsonwebtoken";
import { homeModal } from "../modal";
import { Response, Request } from "express";

env.config();
export class homeServices {
  /** */
  static async home(req: Response, res: Request) {
    try {
      // extract token
      const token = req.cookies.token || "";
      if (token == "") {
        res.render("home", { work: [], shows: [] });
      } else {
        // validate token
        const { role } = await jwt.verify(token, process.env.LOGIN_SECRETE);

        // redirect to admin dashboard
        if (role.split(",").includes("admin")) {
          const details = await homeModal.details();
          res.render("dashboard/admin", {
            data: { owner: details["owners"], contact: details["contacts"] },
          });
        }
        // redirect to owner dashboard
        else if (role.split(",").includes("owner")) {
          res.render("dashboard/owner", {
            data: { employee: 0, payment: 0, comment: 0, notification: 0 },
          });
        }
        // redirect to agent dashboard
        else if (role.split(",").includes("agent")) {
          res.render("dashboard/agent", { data: [] });
        }
        // redirect to manager dashboard
        else if (role.split(",").includes("manager")) {
          res.render("dashboard/manager", {
            data: { employee: 0, payment: 0, comment: 0, notification: 0 },
          });
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
