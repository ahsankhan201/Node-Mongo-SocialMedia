const catchAsync = require("../../utils/catchAsync");
const AppError = require('../../utils/AppError');
const networkModel = require('../../models/network');
const likeUserModel = require('../../models/like');
const userModel = require('../../models/members');
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
  }
  else {

    // likeUserModel.findByIdAndDelete({user_id:{$eq:ObjectId(req.body.user_id)},content_id:{$eq: ObjectId(req.body.content_id)} })


    likeUserModel.findOneAndDelete(
      {user_id:{$eq:ObjectId(req.body.user_id)},content_id:{$eq: ObjectId(req.body.content_id)} }, (err, result) => {
        if (result) {
          res.status(STATUS_CODE.OK).json({
            message: SUCCESS_MSG.SUCCESS_MESSAGES.DELETE,
          });
        }
        else {
          var like = new likeUserModel(req.body);
          like.save().then((likeResult) => {
            res.status(STATUS_CODE.CREATED).json({
              status: STATUS.SUCCESS,
              message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
              result: likeResult,
            });
          });
        }
      })
  }
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
    {
      $addFields: {

        follower_id: {
          $cond: {
            if: "$follower_id",
            then: "$follower_id",
            else: "",
          },
        },

      },
    },
    {
      $project: {
        follower_id: 1,
        _id: 0,
      },
    },
    // { $count: 'followers' },
  ]);
  const likes = await likeUserModel.aggregate([


    { $match: { content_id: ObjectId(req.query.profile_id) } },
    {
      $addFields: {

        user_id: {
          $cond: {
            if: "$user_id",
            then: "$user_id",
            else: "",
          },
        },

      },
    },
    {
      $project: {
        user_id: 1,
        _id: 0,
      },
    },

    // { $match: { content_id: ObjectId(req.query.profile_id) } },
    // { $count: 'likes' },
  ]);
  return res.status(STATUS_CODE.OK).json({
    status: STATUS.SUCCESS,
    message: SUCCESS_MSG.SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
    result: {
      followers: followers,
      likes: likes
    }
  });
});



exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userModel.find({});
  return res.status(STATUS_CODE.OK).json({
    status: STATUS.SUCCESS,
    message: SUCCESS_MSG.SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
    result: {
      users: users
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  if (!req.query.user_id ||
    !ObjectId.isValid(req.query.user_id)) {
    return next(
      new AppError('Invalid Request Data', STATUS_CODE.BAD_REQUEST)
    );
  }
  const user = await userModel.find({ $and: [{ _id: { $eq: ObjectId(req.query.user_id) } }] });
  return res.status(STATUS_CODE.OK).json({
    status: STATUS.SUCCESS,
    message: SUCCESS_MSG.SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
    result: {
      user: user.length > 0 ? user[0] : 0
    }
  });
});