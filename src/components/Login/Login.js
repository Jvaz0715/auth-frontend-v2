import React, { Component } from 'react';
import { isEmpty, isEmail } from "validator"
;// import { toast } from 'react-toastify';
// import Axios from "../utils/Axios";

export class Login extends Component {
   state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      isButtonDisabled: true,
   };

   handleOnChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      }, () => {
         // email validation
         if (event.target.name === "email"){
            if(isEmpty(this.state.email)){
               this.setState({
                  emailError: "Email cannot be empty"
               })
            } else {
               if(isEmail(this.state.email)){
                  this.setState({
                     emailError: "",
                  })
               } else {
                  this.setState({
                     emailError: "Please enter a valid email address",
                  })
               }
            }
         };

         // password validation
         if (event.target.name === "password") {
            if (isEmpty(this.state.password)){
               this.setState({
                  passwordError: "Password cannot be empty"
               })
            } else {
               this.setState({
                  passwordError: "",
               })
            }
         };

         // button disable toggle
         if (
            this.state.emailError.length === 0 &&
            this.state.passwordError.length === 0
         ) {
            this.setState({
               isButtonDisabled: false,
            })
         }
      });
   };

   render() {
      const {
         email,
         password,
         emailError,
         passwordError
      } = this.state;

      return (
         <div className="container">
            <div className="form-text">Login</div>
            
            <div className="form-div">
               <form className="form" onSubmit={this.handleOnSubmit}>
                  <div className="form-group-inline">
                  
                     {/* email */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="email">Email</label>
                           <input 
                              type="text" 
                              id="email" 
                              value={email}
                              placeholder="Email"
                              name="email"
                              onChange={this.handleOnChange}
                           />
                           <div className="errorMessage">
                              {emailError && emailError}
                           </div>
                        </div>
                     </div>

                     {/* password */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="password">Password</label>
                           <input 
                              type="text" 
                              id="password" 
                              value={password}
                              placeholder="Password"
                              name="password"
                              onChange={this.handleOnChange}
                           />
                           <div className="errorMessage">
                              {passwordError && passwordError}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* submit button */}
                  <div className="button-container">
                     <button type="submit" disabled={this.state.isButtonDisabled}>Submit</button>
                  </div>

               </form>
            </div>
         </div>
      )
   }
}

export default Login;
