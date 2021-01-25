import { Request, Response } from "express";

export class dashboardServices {
  static async to(req: Request, res: Response) {
    res.render("dashbaord/customer", {});
  }
}
