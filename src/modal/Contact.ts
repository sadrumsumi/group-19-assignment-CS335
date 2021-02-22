import { Contact } from "../entity";

export class contactModal {
  /** */
  static async contactUs({ name, email, subject, message }: contactUs) {
    try {
      const entryResult = new Contact({
        name,
        email,
        subject,
        description: message,
      });
      await entryResult.save();
      return Promise.resolve("Look fine.");
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** */
  static async contact(): Promise<any> {
    try {
      const fetchResult = await Contact.find();
      return Promise.resolve(
        fetchResult.map((data) => {
          return {
            name: data["name"],
            email: data["email"],
            subject: data["subject"],
            message: data["description"],
          };
        })
      );
    } catch (error) {
      return Promise.reject("Somethings went wrong, try again later.");
    }
  }
}

export interface contactUs {
  name: string;
  email: string;
  subject: string;
  message: string;
}
