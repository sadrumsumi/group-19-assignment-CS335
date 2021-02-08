import { userRouter } from "./user";
import { homeRouter } from "./home";
import { owneRouter } from "./owners";
import { paymentRouter } from "./payment";
import { employeeRouter } from "./Employee";

export const Routes = [
  employeeRouter,
  userRouter,
  homeRouter,
  owneRouter,
  paymentRouter,
];
