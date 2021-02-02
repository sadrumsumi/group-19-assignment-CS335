import { User } from "../entity";
import { Logger } from "../config";
import { Validation, Password } from "../utils";

export class ownerModal {
  /** */
  static async addOwner({ phone, email, password }: addowner): Promise<any> {
    try {
      const valResult = await Validation.signup({
        phone,
        email,
        password,
        cpassword: password,
      });
      const hashPassword = await Password.encrypt({ password });
      const insOwner = new User({ phone, email, password: hashPassword });
    } catch (error) {
      Logger.error(error);
      return Promise.reject({
        status: false,
        message: "Somethings went wrong, try again later.",
      });
    }
  }
}

export interface addowner {
  phone: string;
  email: string;
  password: string;
}
