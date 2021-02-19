import { Activity as EActivity, User } from "../entity";

export class Task {
  /** */
  static async login({ id, data }: login): Promise<any> {
    try {
      const fetchUser = await User.findOne({ where: { phone: id } });
      const loginActivity = new EActivity({
        type: "signin",
        ip: data["ip"],
        user: fetchUser,
        flag: data["flag"],
        city: data["city"],
        country: data["country"],
        district: data["district"],
        latitude: data["latitude"],
        longitude: data["longitude"],
      });
      await loginActivity.save();
      return Promise.resolve("Look fine.");
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** */
}

export interface login {
  id: string;
  data: {
    ip: string;
    flag: string;
    city: string;
    country: string;
    district: string;
    latitude: string;
    longitude: string;
  };
}
