const request = require("supertest");
const app = require("../app");

describe("App endpoints", () => {
  test("GET / should return project response", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello from Jenkins + Docker CI/CD!");
  });

  test("GET /health should return healthy status", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("healthy");
  });
});