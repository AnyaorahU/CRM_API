function authorize(...roles) {
  console.log("authorize reached");
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    console.log("role confirmed");
    next();
  };
}

module.exports = authorize;
