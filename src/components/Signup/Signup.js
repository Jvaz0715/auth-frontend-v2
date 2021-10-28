import React, { Component } from 'react';

import "./Signup.css";

export class Signup extends Component {
   
   state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
   }

   render() {

      const {
         firstName,
         lastName,
         email,
         username,
         password,
         confirmPassword,
      } = this.state;

      return (
         <div className="container">
            <div className="form-text">Sign up</div>
            
            <div className="form-div">
               <form className="form">
                  <div className="form-group-inline">
                     {/* first name */}
                     <div className="inline-container">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" value={firstName} placeholder="First Name"/>
                     </div>
                     {/* last name */}
                     <div className="inline-container">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" value={lastName} placeholder="Last Name"/>
                     </div>
                     {/* email */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="email">Email</label>
                           <input type="text" id="email" value={email} placeholder="Email"/>
                        </div>
                     </div>
                     {/* username */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="username">Username</label>
                           <input type="text" id="username" value={username} placeholder="Username"/>
                        </div>
                     </div>

                     {/* password */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="password">Password</label>
                           <input type="text" id="password" value={password} placeholder="Password"/>
                        </div>
                     </div>

                     {/* confirm password */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="confirmPassword">Confirm Password</label>
                           <input type="text" id="confirmPassword" value={confirmPassword} placeholder="Confirm Password"/>
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
