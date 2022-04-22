const bcryptjs = require('bcryptjs');
const User = require('../../models/members');




exports.correctPassword = async function (candidatePassword, userpassword) {
    // Check Password Is Correct??
    return await bcryptjs.compare(candidatePassword, userpassword);
};