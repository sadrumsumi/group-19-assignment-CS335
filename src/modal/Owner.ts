import { User, Role, UseRole } from "../entity";
import { Logger, Db } from "../config";
import { RoleType } from "../utils";
import { filter } from "vue/types/umd";

export class ownerModal {
  /** */
  static async addOwner({
    brand,
    phone,
    email,
    password,
  }: addowner): Promise<any> {
    // get state of a database
    const queryRunner = await Db.state();
    // start stransaction
    await queryRunner.startTransaction();
    try {
      // fetch role
      const fetchRole = await Role.findOne({ where: { name: "owner" } });

      // insert new user
      const insOwner = new User({ brand, phone, email, password });
      await queryRunner.manager.save(insOwner);

      // insert role relationship
      const userole = new UseRole({
        user: insOwner,
        role: fetchRole,
      });
      await queryRunner.manager.save(userole);

      // commit stransaction
      await queryRunner.commitTransaction();

      return Promise.resolve({ status: true, message: "Look fine." });
    } catch (error) {
      Logger.error(error);
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
  static async getOweners() {
    try {
      let fetchResult = await User.find({
        relations: ["userole", "userole.role"],
      });
      fetchResult = JSON.parse(JSON.stringify(fetchResult));
      const filterResult = await fetchResult.filter(
        await ownerModal.filterByRole
      );
      console.log(filterResult);
      return Promise.resolve(filterResult);
    } catch (error) {
      Logger.error(error);
      return Promise.reject({
        status: false,
        message: "Somethings went wrong, try again later.",
      });
    }
  }

  /** */
  static async filterByRole(item): Promise<any> {
    if (await RoleType.check({ key: "owner", data: item["userole"] })) {
      return true;
    }
    return false;
  }
}

export interface addowner {
  brand: string;
  phone: string;
  email: string;
  password: string;
}
