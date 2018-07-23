import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch, NavLink } from 'react-router-dom';

import Auth from './Auth';

import Callback from './components/Callback';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
// import axios from 'axios';

// src/Auth/Auth.js

class App extends Component {
  // componentDidMount = () => {
  //   axios.get('/user')
  //     .then(res => {
  //       console.log(res.data);
  //     });
  // }
  

  render() {
    const auth = new Auth(this.props.history);
    const isAuth = auth.isAuthenticated(); // Boolean true/false

    return (
      <div>
        <header>
          <h3>Logo</h3>

          <p>{isAuth}</p>

          <nav>
            <span>{isAuth ? localStorage.getItem('user_email') : <button onClick={auth.login}>Login</button> }</span>

            {isAuth ? <NavLink to="/dashboard/profile">Profile</NavLink> : ''}

            {isAuth ? <span onClick={auth.logout}>Logout</span> : ''}
          </nav>
        </header>

        <main>
          <Switch>
            {/* STEP #3 */}
            <Route path="/callback" render={() => (
              <div>
                {!isAuth ? <Callback processAuth={auth.processAuthentication} /> : <Redirect to="/dashboard" />}
              </div>
            )} />

            <Route path="/" exact render={() => (
              <div>
                {!isAuth ? <Landing /> : <Redirect to="/dashboard" />}
              </div>
            )} />

            {/* STEP #10 */}
            <Route path="/dashboard" render={() => (
              <div>
                {isAuth ? <Dashboard /> : <Redirect to="/" />}
              </div>
            )} />
          </Switch>

        </main>
        {/* <button onClick={auth.logout}>Logout</button> */}
      </div>  
    );
  }
}

export default withRouter(App);
