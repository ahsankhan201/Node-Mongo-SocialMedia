const catchAsync = require("../../utils/catchAsync");
const AppError = require('../../utils/AppError');
const networkModel = require('../../models/network');
const likeUserModel = require('../../models/like');
var ObjectId = require("mongodb").ObjectId;
const { ERRORS, STATUS_CODE, SUCCESS_MSG, STATUS, ROLES, TYPES } = require('../../constants/index');

exports.follow = catchAsync(async (req, res, next) => {
  if (!req.body ||
    !req.body.follower_id ||
    !req.body.profile_id) {
    return next(
      new AppError('Invalid Request Data', STATUS_CODE.BAD_REQUEST)
    );
  };
  var network = new networkModel(req.body);
  network.save().then((networkResult) => {
    res.status(STATUS_CODE.CREATED).json({
      status: STATUS.SUCCESS,
      message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
      result: networkResult,
    });
  });
});

exports.like = catchAsync(async (req, res, next) => {
  if (!req.body ||
    !req.body.user_id ||
    !req.body.content_id) {
    return next(
      new AppError('Invalid Request Data', STATUS_CODE.BAD_REQUEST)
    );
  };
  var like = new likeUserModel(req.body);
  like.save().then((likeResult) => {
    res.status(STATUS_CODE.CREATED).json({
      status: STATUS.SUCCESS,
      message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
      result: likeResult,
    });
  });
});

exports.userDetails = catchAsync(async (req, res, next) => {
  if (!req.query.profile_id ||
    !ObjectId.isValid(req.query.profile_id)) {
    return next(
      new AppError('Invalid Request Data', STATUS_CODE.BAD_REQUEST)
    );
  }
  const followers = await networkModel.aggregate([
    { $match: { profile_id: ObjectId(req.query.profile_id) } },
    { $count: 'followers' },
  ]);
  const likes = await likeUserModel.aggregate([
    { $match: { content_id: ObjectId(req.query.profile_id) } },
    { $count: 'likes' },
  ]);
  return res.status(STATUS_CODE.OK).json({
    status: STATUS.SUCCESS,
    message: SUCCESS_MSG.SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
    result: {
      followers: followers.length > 0 ? followers[0].followers : 0,
      likes: likes.length > 0 ? likes[0].likes : 0
    }
  });
});