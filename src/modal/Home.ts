import { User, Contact } from "../entity";
import { Filter } from "../utils";

export class homeModal {
  /** */
  static async details(): Promise<any> {
    try {
      let getAllUser = await User.find({
        relations: ["userole", "userole.role"],
      });
      const filteResult = await Filter.user({ key: "owner", getAllUser });
      let owners = filteResult.length;
      console.log(filteResult)
      //
      let contacts = await Contact.find();

      return Promise.resolve({ owners, contacts: contacts.length });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
