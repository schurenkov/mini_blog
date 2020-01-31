import Post from '../models/post-model';
import {ObjectId} from 'mongodb';

const createPost = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a post',
        })
    }

    const post = new Post(body);

    post
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: post._id,
                createdAt: post.createdAt,
                message: 'Post created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Post not created!',
            })
        })
};


const deletePost = async (req, res) => {
    await Post.findOneAndDelete({ _id: ObjectId(req.params.id) }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }

        return res.status(200).json({ success: true, data: post })
    }).catch(err => console.log(err))
};


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", 'name');

        return res.status(200).json({ success: true, data: posts })

    } catch (err) {
        return res.status(400).json({ success: false, error: err })
    }
};

export default {
    createPost,
    deletePost,
    getPosts,
}
