import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

import "./Nav.css";

export class Nav extends Component {
   // we use props passed down to check if user is null or true to change what nav bar we will display 
   //this.props.user
   // ================= render =================
   render() {
      return (
         <nav>
            <div className="h1-logo">
               <h1>
                  <Link to="/">IMDb APP</Link>
               </h1>
            </div>
            <div className="right-side-nav">
               <ul>
                  <li>
                     {/* make ternary that checks if user is authorized or not */}
                     {this.props.user ? (
                        <NavLink activeClassName="selected" to="/profile">Profile</NavLink>
                     ):(
                        <NavLink activeClassName="selected" to="/sign-up">Sign Up</NavLink>
                     )}
                     
                  </li>
                  <li>
                     {/* make ternary that checks if user is authorized or not */}
                     {this.props.user ? (
                        <NavLink activeClassName="selected" to="/logout">Logout</NavLink>
                     ):(
                        <NavLink activeClassName="selected" to="/login">Login</NavLink>
                     )}
                     
                  </li>
               </ul>
            </div>
         </nav>
      )
   }
}

export default Nav;
