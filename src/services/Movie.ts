import { Extract, Screenshots } from "../utils";
import { Request, Response } from "express";
import { movieModal } from "../modal";

export class movieServices {
  /** */
  static async getPage(req: Request, res: Response) {
    try {
      const { phone } = await Extract.token(req);
      const relatedMovie = await movieModal.getMovieBy({ id: phone });
      res.render("movie", { data: relatedMovie });
    } catch (error) {
      res.render("error", { error });
    }
  }

  /** */
  static async addMovie(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const { phone } = await Extract.token(req);
      const { path, filename } = req.file;
      // take a screenshots
      // await Screenshots.take({ videoPath: path });

      const insResult = await movieModal.addMovie({
        file: filename,
        description,
        id: phone,
        title,
      });

      res.redirect("/movie");
    } catch (error) {
      res.render("error", { error });
    }
  }
}
