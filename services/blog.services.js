const Blog = require("../models/blog.schema");
const User = require("../models/user.schema");

// create blog
exports.createBlogService = async (blog) => {
  const savedBlog = await Blog.create(blog);
  return savedBlog;
};

// get blogs
exports.getBlogsService = async (id) => {
  const blogs = await Blog.find();
  return blogs;
};

// get a blog
exports.getBlogService = async (id) => {
  const blog = await Blog.findByIdAndUpdate(
    { _id: id },
    { $inc: { views: 1 } },
    { new: true }
  ).populate(["likes", "dislikes"]);
  return blog;
};

// update blog
exports.updateBlogService = async (id, blog) => {
  const updateBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
  });
  return updateBlog;
};

// delete blog
exports.deleteBlogService = async (id) => {
  const deleteBlog = await Blog.findByIdAndDelete(id, {
    new: true,
  });
  return deleteBlog;
};

// like blog
exports.likeBlogService = async (blogId, loginUserId) => {
  const blog = await Blog.findById(blogId);
  const isLiked = blog?.isLiked;
  const alreadyDisliked = blog?.dislikes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );

  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
  }

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    return blog;
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      {
        new: true,
      }
    );
    return blog;
  }
};

// like blog
exports.dislikeBlogService = async (blogId, loginUserId) => {
  const blog = await Blog.findById(blogId);
  const isDisliked = blog?.isDisliked;
  const alreadyLiked = blog?.likes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    );
  }

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    return blog;
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      {
        new: true,
      }
    );
    return blog;
  }
};
