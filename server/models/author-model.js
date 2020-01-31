import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Author = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        biography: { type: String, required: false },
    },
    { timestamps: true },
);

export default mongoose.model('authors', Author);
