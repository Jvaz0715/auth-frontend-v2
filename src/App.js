import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; // gives us the ability to navigate multi pages
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
// import Login from './components/Login/Login';

import "./App.css";

function App() {
  return (
    <Router>
      <Nav />
      <>
        <Route exact path="/" component={Home} />
        <Route  exact path="/sign-up" component={Signup} />
      </>
    </Router>
  )
}

export default App;
