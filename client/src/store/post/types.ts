export enum PostActionTypes {
  GET_POSTS = '@@post/GET_POSTS',
  GET_POSTS_SUCCESS = '@@post/GET_POSTS_SUCCESS',
  CREATE_POST = '@@post/CREATE_POST',
  CREATE_POST_SUCCESS = '@@post/CREATE_POST_SUCCESS',
  DELETE_POST = '@@post/DELETE_POST',
  DELETE_POST_SUCCESS = '@@post/DELETE_POST_SUCCESS',
}

export interface IPost {
  authorId: string;
  text: string;
  _id?: string;
  createdAt?: string;
}

export interface IPostState {
  loading: boolean;
  posts: IPost[];
}
