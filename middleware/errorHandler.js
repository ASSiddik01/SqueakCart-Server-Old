const errorHandler = (err, req, res, next) => {
  res.send(err.message);
  next();
};

module.exports = errorHandler;
