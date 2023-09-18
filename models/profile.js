// one to one with user
// a profile references a user
// a profile embeds posts which embed comments

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for comments made on a post
const commentSchema = new Schema({
    // related user
    content: String     // text contents
    // verify counter ('likes')
    }, {
    timestamps: true
});

const postSchema = new Schema({
    // related user
    content: String,     // text contents
    comments: [commentSchema]   // array of comments
    }, {
    timestamps: true
});

const profileSchema = new Schema({
    ownerId: {    // user owner
        type: Schema.Types.ObjectId, 

        required: true
    },
    ownerDisplayName: String,   // can be non-unique
    posts: [postSchema]     // array of posts
    //
    }, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);