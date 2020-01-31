import { IPost } from '@STORE/post/types';
import {deletePost, getPosts} from '@STORE/post/actions';

export default interface IProps {
  loading: boolean;
  posts: IPost[];
  handlerGetPost: typeof getPosts;
  handlerDeletePost: typeof deletePost;
}
