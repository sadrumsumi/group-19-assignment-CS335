import { userRouter } from "./user";
import { homeRouter } from "./home";
import { owneRouter } from "./owners";
import { paymentRouter } from "./payment";
import { employeeRouter } from "./Employee";
import { ticketRouter } from "./Tickets";
import { contactRouter } from "./Contact";

export const Routes = [
  contactRouter,
  ticketRouter,
  employeeRouter,
  userRouter,
  homeRouter,
  owneRouter,
  paymentRouter,
];
