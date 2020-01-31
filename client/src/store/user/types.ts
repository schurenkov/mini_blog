export enum UserActionTypes {
  GET_USER = '@@post/GET_USER',
  GET_USER_SUCCESS = '@@post/GET_USER_SUCCESS',
}

export interface IAuthor {
  name: string;
  surname: string;
  biography: string;
  createdAt?: string;
  _id?: string;
}

export interface IUserState {
  loading: boolean;
  author: IAuthor;
}
