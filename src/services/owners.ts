import { Password, Validation } from "../utils";
import { Response, Request } from "express";
import { ownerModal } from "../modal";

export class ownerServices {
  /** */
  static async getPage(req: Request, res: Response) {
    try {
      const fetchResult = await ownerModal.getOweners();
      res.render("owners", { data: fetchResult });
    } catch (error) {
      res.render("error", { error: error });
    }
  }

  /** */
  static async addOwner(req: Request, res: Response) {
    try {
      const { brand, phone, email } = req.body;
      const valResult = await Validation.signup({
        phone,
        email,
        password: phone,
        cpassword: phone,
      });
      const hashResult = await Password.encrypt({ password: phone });
      const insResult = await ownerModal.addOwner({
        brand,
        phone,
        email,
        password: hashResult,
      });
      res.redirect("/owners");
    } catch (error) {
      res.render("error", { error: "Somethings went wrong, tyr again later." });
    }
  }
}
