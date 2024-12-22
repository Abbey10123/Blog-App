const PostService = require("../services/blog.service");

const createBlog = async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const authorNames = `${user.first_name} ${user.last_name}`;

  const createResponse = await PostService.createBlog({
    title: payload.title,

    description: payload.description,

    tags: payload.tags,

    author: authorNames,

    body: payload.body,

    user_id: user._id,
  });
  return res.status(createResponse.code).json(createResponse);
};

const getBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const getPostResponse = await PostService.getBlog({
    blogId,
  });
  return res.status(getPostResponse.code).json(getPostResponse);
};

const getAllBlog = async (req, res) => {
  const { author, title, tags, page, limit } = req.query;
  const getAllResponse = await PostService.getAllBlog({
    author,
    title,
    tags,
    page,
    limit,
  });
  return res.status(getAllResponse.code).json(getAllResponse);
};

const getMyBlog = async (req, res) => {
  const user = req.user;
  const { state, page, limit } = req.query;

  const myBlogResponse = await PostService.getMyBlog({
    user,
    state,
    page,
    limit,
  });
  return res.status(myBlogResponse.code).json(myBlogResponse);
};

const updateBlog = async (req, res) => {
  const payload = req.body;
  const blogId = req.params.blogId;
  const user = req.user;
  const updateResponse = await PostService.updateBlog({
    payload,
    blogId,
    user,
  });

  return res.status(updateResponse.code).json(updateResponse);
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const user = req.user;
  const deleteResponse = await PostService.deleteBlog({
    blogId,
    user,
  });
  return res.status(deleteResponse.code).json(deleteResponse);
};

module.exports = {
  createBlog,
  getBlog,
  getAllBlog,
  getMyBlog,
  updateBlog,
  deleteBlog,
};
