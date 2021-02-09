import { Response, Request } from "express";
import { ticketModal } from "../modal";

export class ticketServices {
  /** */
  static async getPage(req: Request, res: Response): Promise<any> {
    try {
      res.render("ticket", { data: [] });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
