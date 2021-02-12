import { Role } from "../entity";
import { userole } from "../init_data";
import { Logger, Db } from "../config";
import { MigrationInterface, QueryRunner } from "typeorm";

export class userole1613139690457 implements MigrationInterface {
  public async up(): Promise<void> {
    // check state of a database
    const queryRunner = await Db.state();
    // start stransaction
    await queryRunner.startTransaction();
    try {
      for (let a = 0; a < userole.length; a++) {
        const fetchRole = await Role.findOne({
          where: { name: userole[a]["name"] },
        });
        if (!fetchRole) {
          const roleData = new Role({
            name: userole[a]["name"],
            position: userole[a]["position"],
            description: userole[a]["description"],
          });
          await queryRunner.manager.save(roleData);
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
