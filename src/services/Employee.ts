import { Request, Response } from "express";
import { employeeModal } from "../modal";
import { Extract } from "../utils";

export class employeeServices {
  /** */
  static async getPage(req: Request, res: Response) {
    try {
      const { phone } = await Extract.token(req);
      const fetchResult = await employeeModal.getById({ id: phone });
      res.render("employee", { data: fetchResult });
    } catch (error) {
      res.render("error", { error: error });
    }
  }

  /** */
  static async getAdd(req: Request, res: Response) {
    try {
      res.render("employeeadd", { data: [] });
    } catch (error) {
      res.render("error", { error: error });
    }
  }
}
