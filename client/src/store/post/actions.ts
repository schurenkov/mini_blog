import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '@STORE/reducers';
import { PostActionTypes } from './types';
import axios from 'axios';

export const getPosts = (): ThunkAction<void, AppState, void, AnyAction> => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: PostActionTypes.GET_POSTS });

    const response = await axios.get('/api/posts');

    dispatch({ type: PostActionTypes.GET_POSTS_SUCCESS, payload: response.data.data });
  } catch (error) {
    console.error(error);
  }
};

export const createPost = (text: string): ThunkAction<void, AppState, void, AnyAction> => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    const {
      postState: { posts },
      userState,
    }: AppState = getState();

    dispatch({ type: PostActionTypes.CREATE_POST });

    const response = await axios.post('/api/post', { text, author: userState._id });

    dispatch({
      type: PostActionTypes.CREATE_POST_SUCCESS,
      payload: [...posts, { _id: response.data.id, createdAt: response.data.createdAt, text: text, author: userState }],
    });
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = (id: string): ThunkAction<void, AppState, void, AnyAction> => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    const {
      postState: { posts },
    }: AppState = getState();

    dispatch({ type: PostActionTypes.DELETE_POST });

    await axios.delete(`/api/post/${id}`);

    dispatch({
      type: PostActionTypes.DELETE_POST_SUCCESS,
      payload: posts.filter(p => p._id !== id),
    });
  } catch (error) {
    console.error(error);
  }
};
