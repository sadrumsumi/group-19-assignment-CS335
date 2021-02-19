import { Response, Request } from "express";
import { ticketModal } from "../modal";
import { Extract } from "../utils";

export class ticketServices {
  /** */
  static async getPage(req: Request, res: Response) {
    try {
      const { phone } = await Extract.token(req);
      const fetchResult = await ticketModal.getTicketById({ id: phone });

      res.render("ticket/company", { data: fetchResult });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  /** */
  static async posTicket(req: Request, res: Response) {
    try {
      const { phone } = await Extract.token(req);
      const { category, price } = req.body;
      await ticketModal.posTicket({ id: phone, category, price });
      res.redirect("/ticket");
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
