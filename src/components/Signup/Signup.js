import React, { Component } from 'react';

import "./Signup.css";

export class Signup extends Component {
   render() {
      return (
         <div className="container">
            <div className="form-text">Sign up</div>
            
            <div className="form-div">
               <form className="form">
                  <div className="form-group-inline">
                     {/* first name */}
                     <div className="inline-container">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" />
                     </div>
                     {/* last name */}
                     <div className="inline-container">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" />
                     </div>
                     {/* email */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="email">Email</label>
                           <input type="text" id="email" />
                        </div>
                     </div>
                     {/* username */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="username">Username</label>
                           <input type="text" id="username" />
                        </div>
                     </div>

                     {/* password */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="password">Password</label>
                           <input type="text" id="password" />
                        </div>
                     </div>

                     {/* confirm password */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="confirmPassword">Confirm Password</label>
                           <input type="text" id="confirmPassword" />
                        </div>
                     </div>
                  </div>

                  {/* submit button */}
                  <div className="button-container">
                     <button>Submit</button>
                  </div>

               </form>
            </div>
         </div>
      )
   }
}

export default Signup;
