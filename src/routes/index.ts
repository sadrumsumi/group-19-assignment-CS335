import { userRouter } from "./user";
import { homeRouter } from "./home";
import { owneRouter } from "./owners";
import { paymentRouter } from "./payment";
import { employeeRouter } from "./Employee";
import { ticketRouter } from "./Ticket";
import { contactRouter } from "./Contact";
import { movieRouter } from "./Movie";

export const Routes = [
  movieRouter,
  contactRouter,
  ticketRouter,
  employeeRouter,
  userRouter,
  homeRouter,
  owneRouter,
  paymentRouter,
];
