import { Upload } from "../utils";
import { Response, Request } from "express";

export class testServices {
  static async test(req: Request, res: Response) {
    res.render("test", {});
  }

  static async testPost(req: Request, res: Response) {
    try {
      const upload = await Upload.files();
      upload(req, res, function (err) {
        if (req.fileValidationError) {
          res.send({ status: false, message: req.fileValidationError });
        }
        // else if (){} // The same as when uploading single images
        const files = req.files; // return array of uploaded files
        for (let a = 0; a < files.length; a++) {
          console.log(files[a]["filename"]);
        }
      });
    } catch (error) {
      res.send({ status: false, message: error });
    }
  }
}
