const request = require("supertest");
const { connect } = require("./database");
const BlogModel = require("../src/models/blog.model");
const jwt = require("jsonwebtoken");
const UserModel = require("../src/models/user.model");
const app = require("../app");

describe("Blog: create", () => {
  let conn;
  let token;
  let userId;
  let blogId;

  beforeAll(async () => {
    process.env.JWT_SECRET = "test-secret-key";

    conn = await connect();
    const user = await UserModel.create({
      first_name: "Abbey",
      last_name: "Raheem",
      username: "Abbey23",
      email: "Abbey@mail.com",
      password: "123456",
    });

    token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    userId = user._id;

    const blog = await BlogModel.create({
      title: "A Beginner's Guide to Cryptocurrency",
      description:
        "Everything you need to know to get started with cryptocurrency",
      tags: ["Cryptocurrency", "Finance", "Blockchain"],
      body: "Cryptocurrency is a digital or virtual form of money...",
      author: "Abbey Raheem",
      user_id: userId,
    });

    blogId = blog._id;
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should create a new blog post", async () => {
    const response = await request(app)
      .post("/blogs/create")
      .set("Authorization", `Bearer ${token}`)
      .set("content-type", "application/json")
      .send({
        title: "Blog Title",
        description: "Blog Description",
        tags: ["tag1", "tag2"],
        body: "Blog body content",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Blog created successfully");
    expect(response.body.data.post).toHaveProperty("title", "Blog Title");
    expect(response.body.data.post).toHaveProperty("author", "Abbey Raheem");
    expect(response.body.data.post).toHaveProperty("state", "draft");
    expect(response.body.data.post).toHaveProperty("read_count");
    expect(response.body.data.post).toHaveProperty("reading_time");
    expect(response.body.data.post).toHaveProperty("user_id");
    expect(response.body.data.post).toHaveProperty("_id");
  });

  it("should retrieve an existing blog post and increment read_count", async () => {
    const response = await request(app)
      .get(`/blogs/${blogId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("successful");
    expect(response.body.data.viewBlog).toHaveProperty(
      "title",
      "A Beginner's Guide to Cryptocurrency"
    );
    expect(response.body.data.viewBlog).toHaveProperty(
      "author",
      "Abbey Raheem"
    );
    expect(response.body.data.viewBlog).toHaveProperty("read_count", 1);
  });
});
