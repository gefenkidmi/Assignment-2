import initApp from "../server";
import mongoose from "mongoose";
import userModel from "../models/users_model";
import { Express } from "express";
import request from "supertest";

let app: Express;


beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await userModel.deleteMany();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let userId = "";

describe("Users Tests", () => {
  test("Users test get all", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create User", async () => {
    const response = await request(app).post("/users")
      .send({
        email: "test@gmail.com",
        username: "test user",
        password: "Aa123456",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe("test@gmail.com");
    expect(response.body.username).toBe("test user");
    expect(response.body.password).toBe("Aa123456");
    userId = response.body._id;
  });

  test("Test get user by id", async () => {
    const response = await request(app).get("/users/" + userId);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe("test@gmail.com");
    expect(response.body.username).toBe("test user");
  });

  test("Test Create User 2", async () => {
    const response = await request(app).post("/users")
      .send({
        email: "test2@gmail.com",
        username: "test2 user",
        password: "Aa123456",
      });
    expect(response.statusCode).toBe(201);
  });

  test("Users test get all 2", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("Test Delete user", async () => {
    const response = await request(app).delete("/users/" + userId)
    expect(response.statusCode).toBe(200);
    const response2 = await request(app).get("/users/" + userId);
    expect(response2.statusCode).toBe(404);
  });

  test("Test Create user fail", async () => {
    const response = await request(app).post("/users")
      .send({
        email: "test3@gmail.com",
      });
    expect(response.statusCode).toBe(400);
  });
});