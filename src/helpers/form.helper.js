module.exports = {
  success: (res, message, data, status) => {
    res.status(status).json({
      success: true,
      message,
      data,
    });
  },
  error: (res, message, error, status) => {
    res.status(status).json({
      success: false,
      message,
      error,
    });
  },
};
