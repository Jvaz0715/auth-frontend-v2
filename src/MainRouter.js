import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; // gives us the ability to navigate multi pages

import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Movie from './components/Movie/Movie';
import MovieDetail from './components/Movie/MovieDetail';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const MainRouter = (props) => {
   // console.log(props)
   // the props come from app... we have to pass props as an argument before we can use it below
   return(
      
      <Router>
         {/*We put this outside as it will be on all pages */}
         <Nav 
            user={props.user}
            handleUserLogout={props.handleUserLogout}
         /> 
         <>
            <Route exact path="/" component={Home} />
            
            <Route  exact path="/sign-up" component={Signup} />
            
            <Route  
               exact path="/login" 
               // component={Login} 
               // handleUserLogin={props.handleUserLogin} cannot be used because it is react router and will show props as history, match etc. use RENDER as a prop
               // if you use render, you dont use component above
               // since we are resetting props, we also have to pass a routerProps to get history, match...etc that we lost by doing render. 
               // we also pass in a spread object with routerProps into login props
               render={(routerProps) => <Login {...routerProps} handleUserLogin={props.handleUserLogin}/>}
            />

            {/* <Route exact path="/movie" component={Movie} /> */}
            <PrivateRoute 
               exact 
               path="/movie" 
               component={Movie}
            />

            {/* <Route exact path="/movie-detail/:movieTitle" component={MovieDetail} /> */}
            <PrivateRoute 
               exact
               path="/movie-detail/:movieTitle" 
               component={MovieDetail}
            />
         </>
      </Router>
   )
};

export default MainRouter;