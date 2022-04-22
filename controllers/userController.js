// const userModel = require('../models/members')
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/AppError');

// const { ERRORS, STATUS_CODE, SUCCESS_MSG, STATUS, ROLES, TYPES } = require('../constants/index');



// exports.createUser = catchAsync(async (req, res, next) => {
//     if (!req.body ||
//         !req.body.email ||
//         !req.body.password) {
//         return next(
//             new AppError('Invalid Request Data', STATUS_CODE.BAD_REQUEST)
//         );
//     }
//     req.body.role = req.body.role ? req.body.role : 'USER'
//     let userData = new userModel(req.body)
//     userData.generateHash(req.body.password, async function (err, hash) {
//         if (err) {
//             return res.status(400).send({
//                 error: err,
//                 message: 'Error occured in Generating Hash'
//             })
//         }
//         else {
//             userData.password = hash
//             userData.save().then((userDetails) => {
//                 res.status(STATUS_CODE.CREATED).json({
//                     status: STATUS.SUCCESS,
//                     message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
//                     result: userDetails,
//                 });

//             })
//             //     const data =  await userData.create(req.body);
//             // res.status(STATUS_CODE.CREATED).json({
//             //     status: STATUS.SUCCESS,
//             //     message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
//             //     result: data,
//             // });
//         }
//     })
// });

// exports.login = catchAsync(async (req, res, next) => {
//     if (!req.body ||
//         !req.body.email ||
//         !req.body.password) {
//         return next(
//             new AppError('Invalid Request Data', STATUS_CODE.BAD_REQUEST)
//         );
//     }
//     req.body.role = req.body.role ? req.body.role : 'USER'
//     let userData = new userModel(req.body)
//     userData.generateHash(req.body.password, async function (err, hash) {
//         if (err) {
//             return res.status(400).send({
//                 error: err,
//                 message: 'Error occured in Generating Hash'
//             })
//         }
//         else {
//             userData.password = hash
//             userData.save().then((userDetails) => {
//                 res.status(STATUS_CODE.CREATED).json({
//                     status: STATUS.SUCCESS,
//                     message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
//                     result: userDetails,
//                 });

//             })
//             //     const data =  await userData.create(req.body);
//             // res.status(STATUS_CODE.CREATED).json({
//             //     status: STATUS.SUCCESS,
//             //     message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
//             //     result: data,
//             // });
//         }
//     })
// });