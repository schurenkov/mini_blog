import { IPost } from '@STORE/post/types';
import { deletePost } from '@STORE/post/actions';

export default interface IProps {
  data: IPost;
  handlerDeletePost: typeof deletePost;
  deleteShow: boolean;
}
