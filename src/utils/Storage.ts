import * as multer from "multer";
import * as path from "path";

export const Storage = {
  //** */
  image: () => {
    return multer.diskStorage({
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
        if (file.mimetype !== "image/png" || file.mimetype !== "image/jpeg") {
          req.fileValidationError = "goes wrong on the mimetype";
          return cb(null, false, new Error("goes wrong on the mimetype"));
        }
        cb(null, true);
      },
    });
  },

  /** */
  video: () => {
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../../upload/videos"));
      },
      filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      },
      fileFilter: function (req, file, cb) {
        if (file.mimetype !== "video/mp4") {
          req.fileValidationError = "goes wrong on the mimetype";
          return cb(null, false, new Error("goes wrong on the mimetype"));
        }
        cb(null, true);
      },
    });
  },
};
