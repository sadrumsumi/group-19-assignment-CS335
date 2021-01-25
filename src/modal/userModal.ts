import { User } from "../entity";
import { Logger } from "../config";

export class userModal {
  /** */
  static async signup({ phone, email, password }): Promise<any> {
    try {
      const insResult = new User({
        phone: phone,
        email: email,
        password: password,
      });
      await insResult.save();
      return Promise.resolve(true);
    } catch (error) {
      Logger.error(error);
      return Promise.reject(false);
    }
  }

  /** */
  static async signin({ username }): Promise<any> {
    try {
      const fetchResult = User.findOne({
        where: [{ phone: username }, { email: username }],
        select: ["password"],
      });
      return Promise.resolve(fetchResult);
    } catch (error) {
      Logger.error(error);
      return Promise.reject(false);
    }
  }
}
