import { connect } from 'react-redux';
import { Action } from 'redux';
import { AppState } from '@STORE/reducers';
import { getPosts, deletePost } from '@STORE/post/actions';
import { ThunkDispatch } from 'redux-thunk';
import MainPage from './MainPage';
import './style.scss';

const mapStateToProps = ({ postState, userState }: AppState) => ({
  user: userState,
  loading: postState.loading,
  posts: postState.posts,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  handlerGetPost: () => dispatch(getPosts()),
  handlerDeletePost: (id: string) => dispatch(deletePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
