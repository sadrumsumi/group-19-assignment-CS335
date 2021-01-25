import * as bcrypt from "bcryptjs";

export class Password {
  /** encryption function handler */
  static async encrypt({ password }: edata): Promise<any> {
    try {
      const salt = await bcrypt.genSaltSync(10);
      return Promise.resolve(await bcrypt.hashSync(password, salt));
    } catch (error) {
      return Promise.reject("Somethings went wrong, try again later.");
    }
  }

  /** decryptions function handler */
  static async compare({ password, hash }: ddata): Promise<any> {
    try {
      const bool = await bcrypt.compareSync(password, hash);
      if (bool) {
        return Promise.resolve({ status: bool, message: "Look fine." });
      } else {
        return Promise.resolve({
          status: bool,
          message: "You provide wrong informations.",
        });
      }
    } catch (error) {
      return Promise.reject("Somethings went wrong, try again later.");
    }
  }
}

/** encrypted parameter*/
export interface edata {
  password: string;
}

/** decrypted parameter */
export interface ddata {
  password: string;
  hash: string;
}
