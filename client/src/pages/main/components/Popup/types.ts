import { createPost } from '@STORE/post/actions';

export interface IProps {
  handlerCreatePost: typeof createPost;
}

export interface ILocalAuthor {
  _id: string;
  name: string;
}
