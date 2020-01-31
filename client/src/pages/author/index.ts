import { connect } from 'react-redux';
import { Action } from 'redux';
import { AppState } from '@STORE/reducers';
import { getUser } from '@STORE/user/actions';
import { ThunkDispatch } from 'redux-thunk';
import AuthorPage from './AuthorPage';
import { deletePost } from '@STORE/post/actions';

const mapStateToProps = ({ userState, postState }: AppState) => ({
  loading: userState.loading,
  author: userState.author,
  posts: postState.posts.filter(f => f.author._id === userState.author._id),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  handlerGetUser: (id: string) => dispatch(getUser(id)),
  handlerDeletePost: (id: string) => dispatch(deletePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
