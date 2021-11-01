import React from "react";
import {Route, Redirect } from "react-router-dom";

// privateRoute will be used for movie and movie-detail as to only allow authorized (signed up) users use our app

//in the private route argument, we deconstruct the props we are getting from MainRouter.js
// we reassign component to Component, user, and ...rest for all other props brought in
// component: Component makes dynamic whichever component we are passing in as a props
const PrivateRoute = ({ component: Component, user, ...rest }) => {
   // we return a route with a ternary that checks if user is authorized or not
   return (
      <Route 
         // to save code we give route the props brought in from above as ...rest
         {...rest}
         // in render we check if user is authorized we render the Component passed in, otherwise we REDIRECT them to login
         // we also pass routerProps as an argument of our anonymous function
         render={(routerProps) => (
            user ?
            <Component {...routerProps}/> :
            <Redirect to="/login" />
         )}
      />
   )
}; 

export default PrivateRoute;