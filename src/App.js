import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import './App.css';
import Login from './Login.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import Todo from './Todo.js'
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
  state = {
    username: localStorage.getItem('USERNAME') || '',
    email: localStorage.getItem('EMAIL') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTokenAndUsername = (username, email, token) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('EMAIL', email);
    localStorage.setItem('USERNAME', username);

    this.setState({
      username: username,
      email: email,
      token: token
    })
  }

  logOut = () => {
    localStorage.setItem('USERNAME', '');
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('EMAIL', '');

    this.setState({
      username: '',
      email: '',
      token: ''
    })

  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            {
              this.state.token ? <div>
                <div className="header"><span className="username-header">{this.state.username}</span>
                <button className="log-out" onClick={this.logOut}>Log out</button>
                </div>
              </div>
              : <>
              <Link to="/login" style={{ textDecoration: 'none' }}><div className="log-in">Log In</div></Link>
              <Link to="/signup" style={{ textDecoration: 'none' }}><div className="sign-up">Sign Up</div></Link>
              </>}
              </ul>
              <Switch>
                <Route exact path='/' render={(routerProps) => <Home {...routerProps} />} />
                <Route exact path='/login' render={(routerProps) =>
                <Login
                  {...routerProps}
                  changeTokenAndUsername={this.changeTokenAndUsername}
                  />
                }
                />
                <Route
                exact
                path='/signup'
                render={(routerProps) =>
                <SignUp
                  {...routerProps}
                changeTokenAndUsername={this.changeTokenAndUsername}
                />
              }
              />
              <PrivateRoute
                token={this.state.token}
                exact
                path='/todo'
                render={(routerProps) => <Todo {...routerProps} token={this.state.token} />} />
              </Switch>
        </Router>
      </div>
    )
  }
}
