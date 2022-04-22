const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


var networkSchema = new Schema({
    profile_id: ObjectId,
    follower_id: ObjectId,
    update_at: { type: Date },
    created_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('network', networkSchema,'network');
