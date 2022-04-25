const mongoose = require("mongoose");

const CommentModel = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    comments: {
      type:String  
    }});

const PostModel = new mongoose.Schema({
    // creator email: currently
    creator: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    comments: {
        type: [CommentModel],
        default: undefined
    }
});

const post = mongoose.model('post', PostModel);
const comment = mongoose.model('comment',CommentModel);
module.exports = {post,comment};