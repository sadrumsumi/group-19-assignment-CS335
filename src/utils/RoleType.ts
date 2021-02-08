export class RoleType {
  /** */
  static async check({ key, data }: check): Promise<any> {
    let roles = "";
    if (data.length == 1) {
      roles += `${data[0]["role"]["name"]}`;
    } else {
      for (let a = 1; a <= data.length; a++) {
        roles += `${data[a - 1]["role"]["name"]}`;
        if (a < data.length) {
          roles += ",";
        }
      }
    }
    return Promise.resolve(roles.split(",").includes(key) ? true : false);
  }

  /** */
}

export interface check {
  key: string;
  data: any;
}
