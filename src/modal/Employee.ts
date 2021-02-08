import { User } from "../entity";

export class employeeModal {
  /** */
  static async getById({ id }): Promise<any> {
    try {
      const fetchResult = await User.findOne({
        where: [{ phone: id }],
        relations: ["owner"],
      });
      return Promise.resolve(fetchResult["owner"]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** */
}
