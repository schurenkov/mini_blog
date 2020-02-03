import {getAuthor} from '@STORE/author/actions';
import { IPost } from '@STORE/post/types';
import { IAuthor } from '@STORE/author/types';
import {deletePost} from "@STORE/post/actions";
import {IUserState} from "@STORE/user/types";

export interface IMatch<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

export interface IProps {
  match: IMatch<{ id: string }>;
  handlerAuthorUser: typeof getAuthor;
  loading: boolean;
  posts: IPost[];
  author: IAuthor;
  handlerDeletePost: typeof deletePost;
  user: IUserState;
}
