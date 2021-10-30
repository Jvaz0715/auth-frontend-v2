import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; // gives us the ability to navigate multi pages
import { ToastContainer } from 'react-toastify'; //put here to be available to everything

import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
       <Nav /> {/*We put this outside as it will be on all pages */}
      <>
        <Route exact path="/" component={Home} />
        <Route  exact path="/sign-up" component={Signup} />
        <Route  exact path="/login" component={Login} />
      </>
    </Router>
  )
}

export default App;
