import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Signup from "./components/Signup/Signup";
import Signin from './components/Signin/Signin';
import Home from './components/Home/Home';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

export default class App extends Component {
  render() {
    let navLink = (
      <div className="Tab">
        <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
          SignIn
        </NavLink>
        <NavLink to="/" className="signUp" activeClassName="activeLink">
          SignUp
        </NavLink>
      </div>
    );

    const login = localStorage.getItem('isLoggedIn');

    return(
      <div className="App">
        {login ? (
          <Router>
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={Home}></Route>
          </Router>
        ) : (
          <Router>
            {navLink}
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={Home}></Route>
          </Router>
        )}
      </div>
    );
  }
}