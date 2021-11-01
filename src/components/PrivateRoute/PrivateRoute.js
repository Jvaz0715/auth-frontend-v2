import React from "react";
import {Route, Redirect } from "react-router-dom";
import Home from "../Home/Home";

//we use this file to make sure that only signed up and logged in users have access to our app
const PrivateRoute = (props) => {

   return <Route path={props.path} component={props.component}/>
};

export default PrivateRoute;