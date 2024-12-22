const express = require("express");
const UserRoutes = require("./routes/user.routes");
const BlogRoutes = require("./routes/blog.routes");

const app = express();

app.use(express.json());

app.use("/user", UserRoutes);
app.use("/blogs", BlogRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Blogpage App" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found", code: 404 });
});

module.exports = app;
