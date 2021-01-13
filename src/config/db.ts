import { getConnection } from "typeorm";

export class Db {
  /** */
  static async state(): Promise<any> {
    // get database connection
    const connection = getConnection();
    // create a new query runner
    const queryRunner = connection.createQueryRunner();
    // establish database connection
    await queryRunner.connect();
    return Promise.resolve(queryRunner);
  }
}
