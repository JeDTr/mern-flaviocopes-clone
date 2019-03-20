import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {setCurrentUser, logoutUser} from './actions/authActions';

import store from './store';

import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard';
import CreateTagForm from './components/admin/CreateTagForm';
import EditTagForm from './components/admin/EditTagForm';
import CreatePostForm from './components/admin/CreatePostForm';
import EditPostForm from './components/admin/EditPostForm';
import PostList from './components/post/PostList';
import PostPage from './components/post/PostPage';
import TagPage from './components/post/TagPage';
import Hello from './components/test/Hello';

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';

// axios default config
axios.defaults.baseURL = 'http://localhost:5000';

// check for token
if (localStorage.getItem('jwtToken')) {
  const token = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = token;
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded))
  // console.log(decoded);

  if (decoded.exp < Date.now() / 1000) {
    store.dispatch(logoutUser())
    window.location.href = '/';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={PostList} />
              <Route exact path="/post/:slugcuid" component={PostPage} />
              <Route exact path="/tag/:tag" component={TagPage} />
              <Route exact path="/hello" component={Hello} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-tag" component={CreateTagForm} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-tag/id/:id" component={EditTagForm} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-post" component={CreatePostForm} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-post/cuid/:cuid" component={EditPostForm} />
              </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
