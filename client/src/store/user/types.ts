export enum UserActionTypes {
  GET_USER = '@@post/GET_USER',
  GET_USER_SUCCESS = '@@post/GET_USER_SUCCESS',
}

export interface IAuthor {
  _id: string;
  name: string;
  surname: string;
  biography: string;
  createdAt: string;
}

export interface IUserState {
  loading: boolean;
  author: IAuthor;
}
