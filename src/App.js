import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify'; //put here to be available to everything
import jwtDecode from 'jwt-decode'; //to use in component did mount so that we dont lose our logged in on refresh

import MainRouter from './MainRouter';

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
// we cant use function we have to use component in order to send data from children to app back to other children of app

export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount(){
    let getJwtToken = window.localStorage.getItem("jwtToken"); //we set this in login.js if successfully logged in and it lives in local storage
    
    if(getJwtToken) {
      // check the current time against the tokens expired time and issued at time, if not expired, keep logged in
      const currentTime = Date.now() / 1000;

      let decodedJwtToken = jwtDecode(getJwtToken);

      // if decoded exp time is less than current time, log out else log in
      if(decodedJwtToken.exp < currentTime){
        this.handleUserLogout();
      } else {
        this.handleUserLogin(decodedJwtToken)
      };

    }
  };

  // we create a function to handle user login that will be added to our login handleonsubmit and use the decoded jwt token in place of user as an argument
  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email
      }
    })
  };

  // logout
  handleUserLogout = () => {
    // reset user to null AND make sure local storage is cleared
    window.localStorage.removeItem("jwtToken");

    this.setState({
      user: null,
    });
  };
  
  // ================= render =================
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
