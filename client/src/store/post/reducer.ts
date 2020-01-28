import { Reducer } from 'redux';
import { PostActionTypes, IPostState } from './types';

const initialState = {
    loading: false,
    posts: []
}

const PostState: Reducer<IPostState> = (state = initialState, action) => {
    switch (action.type) {
        case PostActionTypes.GET_POSTS:
        case PostActionTypes.CREATE_POST: {
            return {
                ...state,
                loading: true
            }
        }
        case PostActionTypes.GET_POSTS_SUCCESS:
        case PostActionTypes.CREATE_POST_SUCCESS: 
        case PostActionTypes.DELETE_POST_SUCCESS: {
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        }
    
        default:
            return state;
    }
}

export default PostState;