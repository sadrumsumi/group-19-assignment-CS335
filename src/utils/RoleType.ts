import { Sort } from "../utils";

export class RoleType {
  /** */
  static async get({ data }: role): Promise<any> {
    let roles = [];
    if (data.length == 1) {
      roles.push({
        role: `${data[0]["role"]["name"]}`,
        position: `${data[0]["role"]["position"]}`,
      });
    } else {
      for (let a = 0; a < data.length; a++) {
        roles.push({
          role: `${data[a]["role"]["name"]}`,
          position: `${data[a]["role"]["position"]}`,
        });
      }
    }
    return Promise.resolve(roles);
  }

  /** target */
  static target({ key, data }) {
    return data.includes(key);
  }

  /** give priority */
  static async givePriority({ data }: role): Promise<any> {
    try {
      const roles = await Sort.data(await RoleType.get({ data }));
      return Promise.resolve(roles[0]["role"]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export interface role {
  data: any;
}

export interface target {
  key: string;
  data: Array<Object>;
}
