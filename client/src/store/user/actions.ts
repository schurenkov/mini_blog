import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '@STORE/reducers';
import { UserActionTypes } from './types';
import axios from 'axios';
import { getPosts } from '@STORE/post/actions';

export const getUser = (id): ThunkAction<void, AppState, void, AnyAction> => async (
  dispatch: ThunkDispatch<AppState, void, Action>,
  getState
) => {
  try {
    const {
      postState: { posts },
    } = getState();

    dispatch({ type: UserActionTypes.GET_USER });

    const responseUser = await axios.get(`/api/author/${id}`);

    dispatch({ type: UserActionTypes.GET_USER_SUCCESS, payload: responseUser.data.data });

    if (posts.length === 0) {
      dispatch(getPosts());
    }
  } catch (error) {
    console.log(error);
  }
};
