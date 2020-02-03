import { connect } from 'react-redux';
import { Action } from 'redux';
import { AppState } from '@STORE/reducers';
import { getAuthor } from '@STORE/author/actions';
import { ThunkDispatch } from 'redux-thunk';
import AuthorPage from './AuthorPage';
import { deletePost } from '@STORE/post/actions';

const mapStateToProps = ({ authorState, postState, userState }: AppState) => ({
  user: userState,
  loading: authorState.loading,
  author: authorState.author,
  posts: postState.posts.filter(f => f.author._id === authorState.author._id),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  handlerAuthorUser: (id: string) => dispatch(getAuthor(id)),
  handlerDeletePost: (id: string) => dispatch(deletePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
