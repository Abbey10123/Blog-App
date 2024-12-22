const BlogModel = require("../models/blog.model");

const createBlog = async ({
  title,
  description,
  tags,
  author,
  body,
  user_id,
}) => {
  try {
    const post = await BlogModel.create({
      title,
      description,
      tags,
      author,
      body,
      user_id,
    });

    return {
      code: 200,
      message: "Blog created successfully",
      data: { post },
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      data: null,
      message: error.message,
    };
  }
};

getBlog = async ({ blogId }) => {
  try {
    const foundPost = await BlogModel.findOne({ _id: blogId });
    if (!foundPost) {
      return {
        code: 404,
        message: "Post not found",
      };
    }
    foundPost.read_count += 1;
    await foundPost.save();
    const viewBlog = {
      title: foundPost.title,
      description: foundPost.description,
      tags: foundPost.tags,
      author: foundPost.author,
      reading_time: foundPost.reading_time,
      read_count: foundPost.read_count,
      body: foundPost.body,
      createdAt: foundPost.createdAt,
    };
    return {
      code: 201,
      message: "successful",
      data: { viewBlog },
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      data: null,
      message: error.message,
    };
  }
};

getAllBlog = async ({ author, title, tags, page, limit = 20 }) => {
  try {
    const query = {};
    if (author) {
      query.author = author;
    }
    if (title) {
      query.title = title;
    }
    if (tags) {
      query.tags = tags;
    }
    const allPost = await BlogModel.paginate(query, { page, limit });
    const publishedPost = allPost.docs.filter(
      (post) => post.state === "published"
    );
    console.log(publishedPost);
    const viewPost = publishedPost.map(
      ({
        title,
        description,
        tags,
        author,
        reading_time,
        read_count,
        body,
        createdAt,
      }) => ({
        title,
        description,
        tags,
        author,
        reading_time,
        read_count,
        body,
        createdAt,
      })
    );

    return {
      code: 200,
      message: "Successful",
      data: {
        viewPost,
      },
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      data: null,
      message: error.message,
    };
  }
};

getMyBlog = async ({ user, state, page, limit = 20 }) => {
  try {
    const query = {};
    if (state) {
      query.state = state;
    }
    const allPost = await BlogModel.paginate(query, user, { page, limit });
    const publishedPost = allPost.docs.filter(
      (post) => post.user_id === user._id
    );
    const viewPost = publishedPost.map(
      ({
        title,
        description,
        tags,
        author,
        reading_time,
        read_count,
        body,
        createdAt,
      }) => ({
        title,
        description,
        tags,
        author,
        reading_time,
        read_count,
        body,
        createdAt,
      })
    );

    return {
      code: 200,
      message: "Successful",
      data: { viewPost },
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      data: null,
      message: error.message,
    };
  }
};

updateBlog = async ({ payload, blogId, user }) => {
  try {
    const update = await BlogModel.findOne({ _id: blogId, user_id: user.id });
    if (!update) {
      return {
        code: 404,
        message: "Blog not found",
      };
    }

    update.set(payload);
    await update.save();

    return {
      code: 200,
      message: "Successful",
      data: { update },
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      data: null,
      message: error.message,
    };
  }
};

deleteBlog = async ({ blogId, user }) => {
  try {
    const foundPost = await BlogModel.findOne({
      _id: blogId,
      user_id: user._id,
    });
    if (!foundPost) {
      return {
        code: 404,
        message: "Post not found",
      };
    }
    await foundPost.deleteOne({
      _id: blogId,
      user_id: user._id,
    });
    return {
      code: 201,
      message: "Deleted successfully",
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      data: null,
      message: error.message,
    };
  }
};

module.exports = {
  createBlog,
  getBlog,
  getAllBlog,
  getMyBlog,
  updateBlog,
  deleteBlog,
};
