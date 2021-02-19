import { admin } from "../init_data";
import { Logger, Db } from "../config";
import { Validation, Password } from "../utils";
import { Role, User, Activity, UseRole } from "../entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class admin1613139696767 implements MigrationInterface {
  public async up(): Promise<void> {
    // check state of a database
    const queryRunner = await Db.state();
    // start stransaction
    await queryRunner.startTransaction();
    try {
      // fetch role
      const useRole = await Role.findOne({ where: { name: "admin" } });

      for (let a = 0; a < admin.length; a++) {
        await Validation.signup({
          brand: admin[a]["phone"],
          phone: admin[a]["phone"],
          email: admin[a]["email"],
          password: admin[a]["password"],
          cpassword: admin[a]["password"],
        });
        const fetchUser = await User.findOne({
          where: { phone: admin[a]["phone"] },
        });
        if (!fetchUser) {
          const adminData = new User({
            brand: admin[a]["phone"],
            phone: admin[a]["phone"],
            email: admin[a]["email"],
            password: await Password.encrypt({
              password: admin[a]["password"],
            }),
          });
          await queryRunner.manager.save(adminData);
          // activity
          const dataActivity = new Activity({
            user: adminData,
            type: "signup",
            longitude: "",
            latitude: "",
            district: "",
            country: "",
            city: "",
            flag: "",
            ip: "",
          });
          await queryRunner.manager.save(dataActivity);
          // attache role
          const dataRole = new UseRole({
            user: adminData,
            role: useRole,
          });
          await queryRunner.manager.save(dataRole);
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      Logger.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      // release query runner
      await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
