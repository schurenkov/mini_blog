import { createPost } from '@STORE/post/actions';
import { IUserState } from '@STORE/user/types';
import { createUser } from '@STORE/user/actions';

export interface IProps {
  user: IUserState;
  handlerCreatePost: typeof createPost;
  handlerCreateUser: typeof createUser;
}
