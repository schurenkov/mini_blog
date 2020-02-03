import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '@STORE/reducers';
import { UserActionTypes } from '@STORE/user/types';
import axios from 'axios';

export const getUser = (): ThunkAction<void, AppState, void, AnyAction> => async (
  dispatch: ThunkDispatch<AppState, void, Action>
) => {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: UserActionTypes.GET_USER, payload: JSON.parse(user) });
    }
  } catch (error) {
    console.error(error);
  }
};

export const createUser = (userModel): ThunkAction<void, AppState, void, AnyAction> => async (
  dispatch: ThunkDispatch<AppState, void, Action>
) => {
  try {
    const user = await axios.post('/api/author', userModel);
    dispatch({ type: UserActionTypes.GET_USER, payload: { _id: user.data.id, name: user.data.name } });
    localStorage.setItem('user', JSON.stringify({ _id: user.data.id, name: user.data.name }));
  } catch (error) {
    console.error(error);
  }
};
