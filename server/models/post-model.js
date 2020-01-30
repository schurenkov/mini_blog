const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose;

const Post = new Schema(
    {
        authorId: { type: ObjectId, required: true },
        text: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('posts', Post)