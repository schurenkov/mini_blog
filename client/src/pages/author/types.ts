import { getUser } from '@STORE/user/actions';
import { IPost } from '@STORE/post/types';
import { IAuthor } from '@STORE/user/types';
import {deletePost} from "@STORE/post/actions";

export interface IMatch<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

export interface IProps {
  match: IMatch<{ id: string }>;
  handlerGetUser: typeof getUser;
  loading: boolean;
  posts: IPost[];
  author: IAuthor;
  handlerDeletePost: typeof deletePost;
}
