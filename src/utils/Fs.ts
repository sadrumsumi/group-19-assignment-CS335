import * as fs from "fs";
import * as path from "path";

export class Fs {
  /** */
  static async check(): Promise<any> {
    try {
      let uploadPath = path.join(__dirname, "../../../upload");
      let imagePath = path.join(__dirname, "../../../upload/images");
      let videoPath = path.join(__dirname, "../../../upload/videos");
      let screenshotsPath = path.join(__dirname, "../../../upload/screenshots");
      if (!fs.existsSync(uploadPath)) {
        await fs.mkdirSync(uploadPath);
        await fs.mkdirSync(imagePath);
        await fs.mkdirSync(videoPath);
        await fs.mkdirSync(screenshotsPath);
      } else {
        if (!fs.existsSync(imagePath)) {
          await fs.mkdirSync(imagePath);
        }
        if (!fs.existsSync(videoPath)) {
          await fs.mkdirSync(videoPath);
        }
        if (!fs.existsSync(screenshotsPath)) {
          await fs.mkdirSync(screenshotsPath);
        }
      }
      return Promise.resolve("Look fine.");
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** */
}
