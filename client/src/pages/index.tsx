import React, { FC, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Main from '../pages/main';
import Author from '../pages/author';
import Header from '../components/header';

const App: FC<any> = () => {
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

export default hot(withRouter(App));
