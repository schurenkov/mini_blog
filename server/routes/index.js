import express from 'express';
import PostCtrl from '../controllers/post-ctrl';
import AuthorCtrl from '../controllers/author-ctrl';

const router = express.Router();

router.post('/post', PostCtrl.createPost)
router.delete('/post/:id', PostCtrl.deletePost)
router.get('/posts', PostCtrl.getPosts)

router.post('/author', AuthorCtrl.createAuthor)
router.get('/author/:id', AuthorCtrl.getAuthor)


export default router;
