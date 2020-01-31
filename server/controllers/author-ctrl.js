import {ObjectId} from 'mongodb';
import Author from '../models/author-model';

const createAuthor = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a author',
        })
    }

    const author = new Author(body);

    author
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: author._id,
                name: author.name,
                message: 'Author created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Author not created!',
            })
        })
};

const getAuthor = async (req, res) => {
    await Author.findOne({ _id: ObjectId(req.params.id)}, (err, author) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!author._id) {
            return res
                .status(404)
                .json({ success: false, error: `Author not found` })
        }
        return res.status(200).json({ success: true, data: author })
    }).catch(err => console.log(err))

};

export default {
    createAuthor,
    getAuthor
}
