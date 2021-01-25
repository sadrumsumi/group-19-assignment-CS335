import * as Joi from "joi";

export class Validation {
  /**signin validation handler function*/
  static async signup(data: signup): Promise<any> {
    const { phone, email, password, cpassword } = data;
    const schema = await Joi.object({
      phone: Joi.string().required().pattern(new RegExp("^[0-9]{10,12}$")),
      email: Joi.string()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
      cpassword: Joi.string().required().valid(Joi.ref("password")),
    });
    const { error } = schema.validate({ phone, email, password, cpassword });
    if (error) {
      return Promise.resolve({ status: false, message: "Invalid input." });
    } else {
      return Promise.resolve({ status: true, message: "Look fine." });
    }
  }

  /**signup validation handler function*/
  static async signin(data: signin): Promise<any> {
    const { username, password } = data;
    const schema = Joi.object({
      username:
        username.indexOf("@") !== -1 ||
        username.indexOf(".com") !== -1 ||
        username.indexOf(".net") !== -1
          ? Joi.string()
              .required()
              .email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] },
              })
          : Joi.string().required().pattern(new RegExp("^[0-9]{10,12}$")),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const { error } = schema.validate({ username, password });
    if (error) {
      return Promise.resolve({ status: false, message: "Invalid input." });
    } else {
      return Promise.resolve({ status: true, message: "look fine." });
    }
  }
}

/**signin parameter*/
export interface signup {
  phone: string;
  email: string;
  password: string;
  cpassword: string;
}

/**signup parameter*/
export interface signin {
  username: string;
  password: string;
}
