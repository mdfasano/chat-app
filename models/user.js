const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define what properties a user has
const userSchema = new Schema({
    username: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String,
    profile: Schema.Types.ObjectId// profile
    }, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
