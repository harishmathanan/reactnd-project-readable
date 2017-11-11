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
          <Route path='/category/:category' component={CategoryPage} />
          <Route path="/:category/:id" component={PostPage} />
          <Route path="/delete/:id" component={FormPage} />
          <Route path="/edit/:id" component={FormPage} />
          <Route path="/new" component={FormPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
