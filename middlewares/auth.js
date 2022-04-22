const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { ERRORS, STATUS_CODE, PERMISSIONS, STATUS, } = require("../constants/index");
const jwt = require("jsonwebtoken");


exports.authenticate = catchAsync(async (req, res, next) => {
    //getting token and check is it there
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
  
      return next(
        new AppError(ERRORS.UNAUTHORIZED.NOT_LOGGED_IN, STATUS_CODE.UNAUTHORIZED)
      );
    }
    // //Grant access to protected route
    // req.user = currentUser;
    next();
  });