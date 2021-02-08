import { User, UseRole, Role } from "../entity";
import { Db, Logger } from "../config";
import { userRouter } from "../routes/user";

export class userModal {
  /** */
  static async signup({ phone, email, password }): Promise<any> {
    // get state of a database
    const queryRunner = await Db.state();
    // start stransaction
    await queryRunner.startTransaction();
    try {
      // user account
      const insResult = new User({
        brand: phone,
        phone: phone,
        email: email,
        password: password,
      });
      await queryRunner.manager.save(insResult);

      // data entry [useRole]
      const role = await Role.findOne({ where: { name: "customer" } });
      if (!role) {
        return Promise.reject({
          status: false,
          message: "Somethings went wrong, try again later.",
        });
      }
      const userole = new UseRole({
        user: insResult,
        role: role,
      });
      await queryRunner.manager.save(userole);

      // commit stransaction
      await queryRunner.commitTransaction();

      // give feedback on success
      return Promise.resolve({ status: true, message: "Look fine." });
    } catch (error) {
      // undo changes
      await queryRunner.rollbackTransaction();
      // give feedback
      return Promise.reject({
        status: false,
        message: "Somethings went wrong, try again later.",
      });
    } finally {
      // release query runner
      await queryRunner.release();
    }
  }

  /** */
  static async signin({ username }): Promise<any> {
    try {
      const data = await User.findOne({
        relations: ["userole", "userole.role"],
        where: [{ phone: username }, { email: username }],
      });

      if (!data) {
        return Promise.resolve({
          status: false,
          message: "Information not found of the data specified.",
        });
      }

      let { phone, email, password, userole } = data;
      let role = "";

      if (userole.length == 1) {
        role += `${userole[0]["role"]["name"]}`;
      } else {
        for (let a = 1; a <= userole.length; a++) {
          role += `${userole[a - 1]["role"]["name"]}`;
          if (a < userole.length) {
            role += ",";
          }
        }
      }
      // give feedback
      return Promise.resolve({
        status: true,
        message: { phone, email, password, userole: role },
      });
    } catch (error) {
      Logger.error(error);
      return Promise.reject({
        status: false,
        message: "Somethings went wrong, try again later.",
      });
    }
  }
}
