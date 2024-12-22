const request = require("supertest");
const app = require("../app");

describe("Home Route", () => {
  it("Should return a welcome message", async () => {
    const response = await request(app)
      .get("/")
      .set("content-type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Welcome to the Blogpage App" });
  });

  it("Should return error when routed to an undefined route", async () => {
    const response = await request(app)
      .get("/undefined")
      .set("content-type", "application/json");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Route not found", code: 404 });
  });
});
