import { Request, Response } from "express";

export class notificationServices {
  /** */
  static async getPage(req: Request, res: Response) {
    res.render("notification", { data: [] });
  }
}
