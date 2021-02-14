import { User } from "../entity";
import { Filter } from "../utils";

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
  static async getCustomer(): Promise<any> {
    try {
      let getAllUser = await User.find({
        relations: ["userole", "userole.role"],
      });
      const filteResult = await Filter.user({ key: "customer", getAllUser });
      return Promise.resolve(filteResult);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
