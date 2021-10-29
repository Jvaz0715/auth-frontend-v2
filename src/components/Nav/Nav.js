import React, { Component } from 'react';

import "./Nav.css";

export class Nav extends Component {
   render() {
      return (
         <nav>
            <div className="h1-logo">
               <h1>IMDb APP</h1>
            </div>
            <div className="right-side-nav">
               <ul>
                  <li>
                     Sign Up
                  </li>
                  <li>
                     Login
                  </li>
               </ul>
            </div>
         </nav>
      )
   }
}

export default Nav;
