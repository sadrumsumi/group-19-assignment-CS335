import { Response, Request } from "express";
import { ownerModal } from "../modal";

export class ownerServices {
  /** */
  static getPage(req: Request, res: Response) {
    res.render("owners", { data: [] });
  }

  /** */
  static async addOwner(req: Request, res: Response) {
    try {
      const { phone, email, address, password } = req.body;
      const insResult = await ownerModal.addOwner({
        phone,
        email,
        password,
      });
      res.send({ status: true, message: insResult["message"] });
    } catch (error) {
      res.send({
        status: false,
        message: "Somethings went wrong, try again later.",
      });
    }
  }
}
