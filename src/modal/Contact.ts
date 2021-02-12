import { Comment } from "../entity";

export class contactModal {
  /** */
  static async contactUs({ name, email, subject, message }: contactUs) {
    try {
      const entryResult = new Comment({
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
}

export interface contactUs {
  name: string;
  email: string;
  subject: string;
  message: string;
}
