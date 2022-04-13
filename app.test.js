import request from "supertest";
import chai from "chai";
const expect = chai.expect;

import { server } from "./server.js";

describe("admins", function () {
  describe("GET /api/admin/all", function () {
    let host = server;
    let path = "/api/admin/all";
    it("should return 200 OK with several admins", async function () {
      const response = await request(host)
        .get(path)
        .expect(200)
        .expect("Content-Type", /json/);

      const admins = response.body;
      expect(admins).to.be.an("object");
      expect(admins.message).length.to.be.greaterThan(0);
    });
  });

  describe("get /api/admin/get/:id", function () {
    let host = server;
    let path = "/api/admin/get/622f446a57f5a4e23d20b7f5";
    it("should return 200 OK with one admin", async function () {
      const response = await request(host)
        .get(path)
        .expect(200)
        .expect("Content-Type", /json/);

      const admin = response.body;
      expect(admin).to.be.an("object");
      expect(admin.status).to.equal("ok");
      expect(admin.message).to.be.an("object");
    });
  });

  describe("POST /api/admin/addAdmin", function () {
    // please change params.email before testing
    let host = server;
    let path = "/api/admin/addAdmin";
    let params = {
      name: "john",
      surname: "doe",
      email: "example@hotmail.com",
      password: "12345678",
      phone: "09445545465454",
    };
    it("should return 200 OK with one admin", async function () {
      const response = await request(host)
        .post(path)
        .set("content-type", "application/json")
        .send(params)
        .expect(200)
        .expect("Content-Type", /json/);

      const admin = response.body;
      expect(admin).to.be.an("object");
      expect(admin.status).to.equal("ok");
      expect(admin.message).to.be.an("object");
    });
    it("should return 400 OK with Админ уже существует", async function () {
      const response = await request(host)
        .post(path)
        .set("content-type", "application/json")
        .send(params)
        .expect(400)
        .expect("Content-Type", /json/);

      const admin = response.body;
      expect(admin).to.be.an("object");
      expect(admin.status).to.equal("error");
      expect(admin.message).to.equal("Админ уже существует");
    });
  });
});
