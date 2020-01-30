import { Reducer } from 'redux';
import { UserActionTypes, IUserState } from './types';

const initialState = {
  loading: false,
  author: {
    _id: '',
    name: '',
    surname: '',
    biography: '',
    createdAt: '',
  },
};

const UserState: Reducer<IUserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.GET_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        author: action.payload,
      };
    }

    default:
      return state;
  }
};

export default UserState;
