import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Main from '../pages/main';
import Author from '../pages/author';
import Header from '../components/header';
import { connect } from 'react-redux';
import { getUser } from '@STORE/user/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '@STORE/reducers';
import { Action } from 'redux';

const App = ({ handlerGetUser }) => {
  useEffect(() => {
    handlerGetUser();
  }, []);
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Main} />
        <Route path="/author/:id" exact={true} component={Author} />
      </Switch>
    </>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  handlerGetUser: () => dispatch(getUser()),
});

export default hot(withRouter(connect(null, mapDispatchToProps)(App)));
