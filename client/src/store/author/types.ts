export enum AuthorActionTypes {
  GET_AUTHOR = '@@author/GET_AUTHOR',
  GET_AUTHOR_SUCCESS = '@@author/GET_AUTHOR_SUCCESS',
}

export interface IAuthor {
  name: string;
  surname: string;
  biography: string;
  createdAt?: string;
  _id?: string;
}

export interface IAuthorState {
  loading: boolean;
  author: IAuthor;
}
