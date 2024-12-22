const Router = require ('express').Router
const BlogController = require ('../src/controllers/blog.controller');
const AuthMiddleware = require('../src/middlewares/auth.middleware');

const route = Router()

route.post("/create", AuthMiddleware.ValidateToken,BlogController.createBlog);

route.get("/",  BlogController.getAllBlog);
route.get("/myblogs", AuthMiddleware.ValidateToken, BlogController.getMyBlog);
route.get("/:blogId", BlogController.getBlog);
route.patch("/:blogId",AuthMiddleware.ValidateToken,BlogController.updateBlog);
route.delete("/:blogId",AuthMiddleware.ValidateToken,BlogController.deleteBlog);

module.exports = route
