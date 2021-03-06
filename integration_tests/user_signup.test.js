process.env.NODE_ENV = "integration";

const testDB = require("../test_helper/in_memory_mongodb_setup");
const request = require("supertest");
const app = require("../src/app");
const status = require("http-status");

beforeAll(testDB.setup);
afterAll(testDB.teardown);

describe("New user signup", () => {
  test("Register a new user successfully", async () => {
    const username = "luke";
    const email = "luke@example.com";
    const password = "mypassword";

    let response = await request(app)
      .post("/api/user/signup")
      .send({ user: { username, email, password } });
    let userJson = response.body.user;

    // @ts-ignore
    expect(response.statusCode).toBe(status.OK);
    expect(userJson).toBeDefined();
    expect(userJson.username).toEqual(username);
    expect(userJson.email).toEqual(email);
  });
});
