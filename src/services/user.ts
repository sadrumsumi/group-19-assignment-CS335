import { Request, Response } from "express";
import { Validation, Password } from "../utils";
import { userModal } from "../modal";
import { Authentication } from "../utils";

export class userServices {
  /** /GET */
  static signin(req: Request, res: Response) {
    res.render("signin", { error: "" });
  }

  /** /POST */
  static async postSignin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const validation = await Validation.signin({
        username,
        password,
      });
      if (validation["status"]) {
        const fetchResult = await userModal.signin({ username });
        if (fetchResult["status"]) {
          const comparison = await Password.compare({
            password,
            hash: fetchResult["message"]["password"],
          });
          if (comparison["status"]) {
            const { message } = await Authentication.genarateToken(req, res, {
              phone: fetchResult["message"]["phone"],
              email: fetchResult["message"]["email"],
              role: fetchResult["message"]["userole"],
            });
            message.redirect("/");
          } else {
            res.render("signin", { error: "Invalid username or password." });
          }
        } else {
          res.render("signin", { error: "Invalid username or password." });
        }
      } else {
        res.render("signin", { error: "Invalid input." });
      }
    } catch (error) {
      res.render("error", { error: error });
    }
  }

  /** /GET */
  static async signup(req: Request, res: Response) {
    res.render("signup", { error: "" });
  }

  /** /POST */
  static async postSignup(req: Request, res: Response) {
    try {
      const { phone, email, password, cpassword } = req.body;
      const { status } = await Validation.signup({
        phone,
        email,
        password,
        cpassword,
      });
      if (status) {
        // data insert result
        const hash = await Password.encrypt({ password });
        const { status } = await userModal.signup({
          phone,
          email,
          password: hash,
        });
        if (status) {
          res.render("signin", { error: "" });
        } else {
          res.render("signup", {
            error: "Somethings went wrong, try again later.",
          });
        }
      } else {
        res.render("signup", { error: "Invalid input." });
      }
    } catch (error) {
      res.render("error", { error: error });
    }
  }

  /** */
  static async logout(req: Request, res: Response) {}
}
