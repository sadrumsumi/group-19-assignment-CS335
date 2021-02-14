import { RoleType } from "../utils";

export class Filter {
  /** */
  static async user({ key, getAllUser }): Promise<any> {
    const filterResult = getAllUser.filter((data) => {
      return RoleType.target({
        key: key,
        data: data["userole"].map((data) => {
          return data.role.name;
        }),
      });
    });

    const mapResult = filterResult.map((data) => {
      return {
        id: data["id"],
        brand: data["brand"],
        phone: data["phone"],
        email: data["email"],
        address: data["address"],
      };
    });

    return Promise.resolve(mapResult);
  }
}
