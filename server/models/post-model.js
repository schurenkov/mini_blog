import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const {ObjectId} = mongoose;

const Post = new Schema(
    {
        author: { type: ObjectId, required: true, ref: 'authors' },
        text: { type: String, required: true },
    },
    { timestamps: true },
);

export default mongoose.model('posts', Post)
