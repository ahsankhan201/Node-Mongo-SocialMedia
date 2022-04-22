const userModel = require('../../models/members')
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const jwtManagement = require('../../utils/jwtManagement');
const { ERRORS, STATUS_CODE, SUCCESS_MSG, STATUS, ROLES, TYPES } = require('../../constants/index');


exports.createUser = catchAsync(async (req, res, next) => {
    if (!req.body ||
        !req.body.email ||
        !req.body.password) {
        return next(
            new AppError('Invalid Request Data', STATUS_CODE.BAD_REQUEST)
        );
    }
    req.body.role = req.body.role ? req.body.role : 'USER';
    let userData = new userModel(req.body);
    userData.generateHash(req.body.password, async function (err, hash) {
        if (err) {
            return res.status(400).send({
                error: err,
                message: 'Error occured in Generating Hash'
            });
        }
        else {
            userData.password = hash
            userData.save().then((userDetails) => {
                res.status(STATUS_CODE.CREATED).json({
                    status: STATUS.SUCCESS,
                    message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
                    result: userDetails,
                });
            });
        };
    });
});

exports.login = (Model) => {
    return catchAsync(async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            // checking email or password empty?
            return next(new AppError(ERRORS.INVALID.NO_CREDENTIALS_EMAIL, STATUS_CODE.BAD_REQUEST));
        }
        // Finding user by username, phone or email
        const user = await Model.findOne({ email: email })
            .select('+password')
        //
        if (!user || !(await user.correctPassword(password, user.password))) {
            //user existance and password is correct
            return next(
                new AppError(ERRORS.INVALID.INVALID_LOGIN_CREDENTIALS, STATUS_CODE.BAD_REQUEST)
            );
        }
        jwtManagement.createSendJwtToken(user, STATUS_CODE.OK, req, res);
    });
};