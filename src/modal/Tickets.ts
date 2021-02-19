import { Ticket, User } from "../entity";

export class ticketModal {
  /** */
  static async getTicketById({ id }): Promise<any> {
    try {
      const result = await User.findOne({
        where: { phone: id },
        relations: ["ticket"],
      });
      return Promise.resolve(
        result["ticket"].map((data) => {
          return { category: data["type"], amount: data["price"] };
        })
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /** */
  static async posTicket({ id, category, price }): Promise<any> {
    try {
      // fetch user by id
      const fetchResult = await User.findOne({ where: { phone: id } });
      // add tecket
      const insTicket = new Ticket({
        user: fetchResult,
        type: category,
        price,
      });
      await insTicket.save();
      return Promise.resolve("Look fine.");
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
