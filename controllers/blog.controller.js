const {
  createBlogService,
  updateBlogService,
  getBlogService,
  getBlogsService,
  deleteBlogService,
  likeBlogService,
  dislikeBlogService,
  blogImageUploadService,
  blogImageDeleteService,
} = require("../services/blog.services");

// create blog
exports.createBlog = async (req, res, next) => {
  try {
    const blog = req.body;
    const result = await createBlogService(blog);
    res.status(200).json({
      success: true,
      message: `Blog create successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Blog create failed`,
      error: error.message,
    });
  }
};

// get blogs
exports.getBlogs = async (req, res, next) => {
  try {
    const result = await getBlogsService();
    res.status(200).json({
      success: true,
      message: `Blogs get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Blogs get failed`,
      error: error.message,
    });
  }
};

// get a blog
exports.getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getBlogService(id);
    res.status(200).json({
      success: true,
      message: `Blog get successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Blog get failed`,
      error: error.message,
    });
  }
};

// update blog
exports.updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = req.body;
    const result = await updateBlogService(id, blog);
    res.status(200).json({
      success: true,
      message: `Blog update successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Blog update failed`,
      error: error.message,
    });
  }
};

// update blog
exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteBlogService(id);
    res.status(200).json({
      success: true,
      message: `Blog delete successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Blog delete failed`,
      error: error.message,
    });
  }
};

// like blog
exports.likeBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    const loginUserId = req?.user?._id;
    const result = await likeBlogService(blogId, loginUserId);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: `Blog delete successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Blog delete failed`,
      error: error.message,
    });
  }
};

// like blog
exports.dislikeBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    const loginUserId = req?.user?._id;
    const result = await dislikeBlogService(blogId, loginUserId);
    res.status(200).json({
      success: true,
      message: `Blog delete successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Blog delete failed`,
      error: error.message,
    });
  }
};

// upload blog image
exports.uploadImages = async (req, res) => {
  try {
    const files = req.files;
    const result = await blogImageUploadService(files);
    res.status(200).json({
      success: true,
      message: `Blog image upload successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Blog image upload failed`,
      error: error.message,
    });
  }
};

// delete blog image
exports.deleteImages = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const result = await blogImageDeleteService(id, files);
    res.status(200).json({
      success: true,
      message: `Blog images delete successfully`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Blog images delete failed`,
      error: error.message,
    });
  }
};
