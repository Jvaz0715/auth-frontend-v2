import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify'; //put here to be available to everything
import MainRouter from './MainRouter';

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
// we cant use function we have to use component in order to send data from children to app back to other children of app

export class App extends Component {
  state = {
    user: null,
  };

  // we create a function to handle user login that will work off the localstorage token created if successfully logged in through login.js

  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email
      }
    })
  };

  render() {
    return (
      <>
        <ToastContainer />
        {/* we give MainRouter a props of our user that will be used in MainRouter to determine if user is authorized */}
        <MainRouter 
          user={this.state.user}
          handleUserLogin={this.handleUserLogin}
        />
      </>
    )
  };
};

export default App;
