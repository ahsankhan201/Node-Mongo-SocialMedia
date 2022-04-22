const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


var likeSchema = new Schema({
    user_id: ObjectId,
    content_id: ObjectId,
    update_at: { type: Date },
    created_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('likes', likeSchema,'likes');
