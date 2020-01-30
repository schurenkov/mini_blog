const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Author = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        biography: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('authors', Author)