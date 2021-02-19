import * as request from "supertest";
import { expect } from "chai";
import server from "../src";

describe("applicaton testing", () => {
  let app: any;
  before(async () => {
    app = await server;
  });

  /** */
  describe("GET /home route testing", () => {
    it("should respond wiht status 200", async () => {
      const result = await request(app).get("/");
      expect(result.statusCode).to.equal(200);
    });
  });

  /** */
  describe("GET /signup route testing", () => {
    it("should respond wiht status 200", async () => {
      const result = await request(app).get("/signup");
      expect(result.statusCode).to.equal(200);
    });
  });

  /** */
  describe("GET /signin route testing", () => {
    it("should respond wiht status 200", async () => {
      const result = await request(app).get("/signin");
      expect(result.statusCode).to.equal(200);
    });
  });

  /** */
  // describe("GET /ticket route testing", () => {
  //   it("should respond wiht status 200", async () => {
  //     const result = await request(app).get("/ticket");
  //     expect(result.statusCode).to.equal(200);
  //   });
  // });
});
