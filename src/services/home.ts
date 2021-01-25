import { Response, Request, NextFunction } from "express";

export class homeServices {
  static async home(req: Response, res: Request) {
    try {
      res.render("home", { title: "cinema hall booking system." });
    } catch (error) {}
  }
}
