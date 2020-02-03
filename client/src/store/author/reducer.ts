import { Reducer } from 'redux';
import { AuthorActionTypes, IAuthorState } from './types';

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

const AuthorState: Reducer<IAuthorState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthorActionTypes.GET_AUTHOR: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthorActionTypes.GET_AUTHOR_SUCCESS: {
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

export default AuthorState;
