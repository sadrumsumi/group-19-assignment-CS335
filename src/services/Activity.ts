import { Request, Response } from "express";
import { activityModal } from "../modal";
import { Extract } from "../utils";

export class activityService {
  /** */
  static async getPage(req: Request, res: Response) {
    try {
      const { id } = await Extract.token(req);
      const fetchResult = await activityModal.getActivityBy(id);
      res.render("activity", { data: fetchResult });
    } catch (error) {
      res.render("error", { error });
    }
  }
}
