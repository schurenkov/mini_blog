import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '@STORE/reducers';
import { AuthorActionTypes } from './types';
import axios from 'axios';
import { getPosts } from '@STORE/post/actions';

export const getAuthor = (id): ThunkAction<void, AppState, void, AnyAction> => async (
  dispatch: ThunkDispatch<AppState, void, Action>,
  getState
) => {
  try {
    const {
      postState: { posts },
    } = getState();

    dispatch({ type: AuthorActionTypes.GET_AUTHOR });

    const responseAuthor = await axios.get(`/api/author/${id}`);

    dispatch({ type: AuthorActionTypes.GET_AUTHOR_SUCCESS, payload: responseAuthor.data.data });

    if (posts.length === 0) {
      dispatch(getPosts());
    }
  } catch (error) {
    console.error(error);
  }
};
