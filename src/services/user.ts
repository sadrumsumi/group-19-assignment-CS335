import { Request, Response } from "express";
import { Validation, Password, Authentication } from "../utils";
import { userModal, Task } from "../modal";

export class userServices {
  /** /GET */
  static signin(req: Request, res: Response) {
    res.render("signin", { error: "" });
  }

  /** /POST */
  static async postSignin(req: Request, res: Response) {
    try {
      const {
        ip,
        city,
        username,
        password,
        district,
        latitude,
        longitude,
        country_flag,
        country_name,
      } = req.body;

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
              id: fetchResult["message"]["id"],
              phone: fetchResult["message"]["phone"],
              email: fetchResult["message"]["email"],
              role: fetchResult["message"]["userole"],
            });
            await Task.login({
              id: fetchResult["message"]["phone"],
              data: {
                ip,
                city,
                district,
                latitude,
                longitude,
                flag: country_flag,
                country: country_name,
              },
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
      let {
        ip,
        city,
        brand,
        phone,
        email,
        cpassword,
        password,
        district,
        latitude,
        longitude,
        country_flag,
        country_name,
      } = req.body;

      brand = brand == undefined ? phone : brand;

      const { status } = await Validation.signup({
        brand,
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
          activity: {
            ip,
            city,
            district,
            latitude,
            longitude,
            country_flag,
            country_name,
          },
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
  static async logout(req: Request, res: Response) {
    try {
      res.redirect("/");
    } catch (error) {
      res.render("error", { error: error });
    }
  }
}
