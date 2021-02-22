import { Request, Response } from "express";
import { contactModal } from "../modal";
import { Validation } from "../utils";

export class contactServices {
  /** */
  static async contactUs(req: Request, res: Response) {
    try {
      const { name, email, subject, message } = req.body;
      await Validation.contactUs({ name, email, subject, message });
      await contactModal.contactUs({ name, email, subject, message });
      res.status(200).send({ status: 200, message: "Successful sent." });
    } catch ({ status, message }) {
      res.status(200).send({ status: 400, message });
    }
  }

  /** */
  static async contact(req: Request, res: Response) {
    try {
      const fetchResult = await contactModal.contact();
      res.render("contact", { data: fetchResult });
    } catch (error) {
      res.render("error", { error: error });
    }
  }
}
