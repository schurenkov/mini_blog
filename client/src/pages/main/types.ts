import { IPost } from '@STORE/post/types';
import { deletePost, getPosts } from '@STORE/post/actions';
import { IUserState } from '@STORE/user/types';

export default interface IProps {
  loading: boolean;
  posts: IPost[];
  user: IUserState;
  handlerGetPost: typeof getPosts;
  handlerDeletePost: typeof deletePost;
}
