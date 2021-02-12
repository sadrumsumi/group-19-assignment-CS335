import * as env from "dotenv";

env.config();

export const admin = [
  {
    phone: "255757944370",
    email: "sadrumsumi@gmail.com",
    password: process.env.DEFAULT_PASSWORD,
  },
];
