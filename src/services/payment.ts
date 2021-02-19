import { Request, Response } from "express";

export class paymentServices {
  /** */
  static getPage(req: Request, res: Response) {
    res.render("payment/company", { data: [] });
  }
}
