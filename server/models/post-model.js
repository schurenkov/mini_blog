const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema(
    {
        autor: { type: String, required: true },
        text: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('blog', Post)