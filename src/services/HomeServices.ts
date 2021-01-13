import { Response, Request, NextFunction } from "express";

export class HomeServices {
  static async home(req: Response, res: Request, next: NextFunction) {
    res.render("Home", { title: "cinema hall booking system." });
  }
}