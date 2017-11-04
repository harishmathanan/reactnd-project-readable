import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './containers/siderbar';
import HomePage from './containers/homePage';
import PostPage from './containers/postPage';
import FormPage from './containers/formPage';
import CategoryPage from './containers/categoryPage';
import NotFoundPage from './shared/notFoundPage';

const App = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/post/edit/:id" component={FormPage} />
          <Route path="/post/create" component={FormPage} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/category/:category" component={CategoryPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
