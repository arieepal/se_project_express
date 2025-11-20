const errorHandler = (err, req, res, next) => {
  console.error(req.method, req.path, err);

  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};

module.exports = errorHandler;
