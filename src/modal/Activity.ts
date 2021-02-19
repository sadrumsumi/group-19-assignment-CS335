import { User } from "../entity";

export class activityModal {
  /** */
  static async getActivityBy(id): Promise<any> {
    try {
      const activityFecth = await User.findOne({
        where: { id },
        relations: ["activity"],
      });

      const filterResult = new Array(activityFecth["activity"])[0].filter(
        (data) => {
          return data["type"] == "signin" ? true : false;
        }
      );

      const mapResult = filterResult.map((data) => {
        return {
          ip: data["ip"],
          flag: data["flag"],
          city: data["city"],
          country: data["country"],
          district: data["district"],
          time: new Date(data["createdAt"]).toLocaleString(),
        };
      });

      return Promise.resolve(mapResult.reverse());
    } catch (error) {
      return Promise.resolve(error);
    }
  }
}
