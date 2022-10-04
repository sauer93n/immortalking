const { Schema } = require("mongoose");

const AuthToken = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: String,
});


module.exports = AuthToken;