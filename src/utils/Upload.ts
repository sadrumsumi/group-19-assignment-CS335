import * as multer from "multer";
import * as path from "path";

export class Upload {
  /** */
  static async files(): Promise<any> {
    try {
      let storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, "../../../upload/images"));
        },
        filename: function (req, file, cb) {
          cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
          );
        },
        fileFilter: function (req, file, cb) {
          if (file.mimetype !== "image/png") {
            req.fileValidationError = "goes wrong on the mimetype";
            return cb(null, false, new Error("goes wrong on the mimetype"));
          }
          cb(null, true);
        },
      });
      return Promise.resolve(
        multer({ storage: storage }).array("multiple_files", 5)
      );
    } catch (error) {
      return Promise.reject("Somethings went wrong try again later.");
    }
  }
}
