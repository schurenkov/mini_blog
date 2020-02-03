import { Reducer } from 'redux';
import { UserActionTypes, IUserState } from './types';

const initialState = {
  _id: '',
  name: '',
};

const UserState: Reducer<IUserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.GET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};

export default UserState;
