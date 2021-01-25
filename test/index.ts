import * as request from "supertest";
import { expect } from "chai";
import server from "../src";

describe("applicaton testing", () => {
  let app: any;
  before(async () => {
    app = await server;
  });

  /** */
  describe("home rote testing", () => {
    it("should respond wiht status 200", async () => {
      const result = await request(app).get("/");
      expect(result.statusCode).to.equal(200);
    });
  });
});
