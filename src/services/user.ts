import { Request, Response } from "express";
import { Validation, Password } from "../utils";
import { userModal } from "../modal";

export class userServices {
  /** /GET */
  static async signin(req: Request, res: Response) {
    try {
      res.render("signin", { error: "" });
    } catch (error) {}
  }

  /** /POST */
  static async postSignin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const { status } = await Validation.signin({
        username,
        password,
      });
      if (status) {
        const fetchResult = await userModal.signin({ username });
        if (fetchResult) {
          const { status, message } = await Password.compare({
            password,
            hash: fetchResult["password"],
          });
          if (status) {
            res.redirect("/dashboard");
          } else {
            res.render("signin", { error: "Invalid username or password." });
          }
        } else {
          res.render("signin", { error: "Invalid username or password." });
        }
      } else {
        res.render("signin", { error: "Invalid input." });
      }
    } catch (error) {}
  }

  /** /GET */
  static async signup(req: Request, res: Response) {
    try {
      res.render("signup", { error: "" });
    } catch (error) {}
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
        const insResult = await userModal.signup({
          phone,
          email,
          password: hash,
        });
        if (insResult) {
          res.render("signin", { error: "" });
        } else {
          res.render("signup", {
            error: "Somethings went wrong, try again later.",
          });
        }
      } else {
        res.render("signup", { error: "Invalid input." });
      }
    } catch (error) {}
  }

  /** */
  static async logout(req: Request, res: Response) {}
}
