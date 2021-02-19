import * as ffmpeg from "fluent-ffmpeg";
import * as path from "path";

export class Screenshots {
  /** */
  static async take({ videoPath }): Promise<any> {
    try {
      new ffmpeg(`${videoPath}`).takeScreenshots(
        {
          count: 1,
          timemarks: ["600"], // number of seconds
        },
        `${path.join(__dirname, "../../../upload/screenshots")}`,
        function (err) {
          if (err) return Promise.reject(err);
          console.log("screenshots were saved");
        }
      );
      return Promise.resolve("Look fine.");
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** */
}
