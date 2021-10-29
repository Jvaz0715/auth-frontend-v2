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
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      usernameError: "",
      passwordError: "",
      confirmPasswordError: "",
   }

   // with so many inputs, making a dynamic way to intake and change state makes more sense
   handleOnChange = (event) => {
      // REF: this.setState can take a callback as a second argument
         // this.setState is async so if there is anything below it, it will run BEFORE the setState
         // validation should then occur inside of the callback inside of setState to avoid outdated setState
      this.setState(
         {
            [event.target.name]: event.target.value,
         },
         () => {
            // below we are working to remove errormessage of empty input once user starts typing
            if (event.target.name === "firstName") {
               if (this.state.firstName.length > 0) {
                  this.setState({
                     firstNameError: ""
                  })
               } else {
                  this.setState({
                     firstNameError: `${event.target.placeholder} cannot be empty`
                  })
               }
            }
         }
      )

      
   };

   // for submit button
   handleOnSubmit = (event) => {
      event.preventDefault(); //this is necessary to avoid the app from refreshing
      console.log(this.state)
   }

   // handleOnBlur will detect if you leave an input field without having inputted the proper data
      // handleOnBlur will then be inserted into each of the input fields as the event for onBlur={}
   handleOnBlur = (event) => {
      console.log(event.target.name)
      console.log("Handle onBlur has been triggered")

      if(this.state[event.target.name].length === 0){
         this.setState({
            [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`
         })
      }
      // checking if input field is empty to deliver error message but below will cause alot of unnecessary code and for all inputs to go onBlur at once, the ABOVE is dynamic to target individual onBLurs
      /*if(this.state.firstName.length === 0) {
         this.setState({
            firstNameError: "First Name cannot be empty"
         })
      }
      if(this.state.lastName.length === 0) {
         this.setState({
            lastNameError: "Last Name cannot be empty"
         })
      }
      if(this.state.email.length === 0) {
         this.setState({
            emailError: "Email cannot be empty"
         })
      }
      if(this.state.username.length === 0) {
         this.setState({
            usernameError: "Username cannot be empty"
         })
      }
      if(this.state.password.length === 0) {
         this.setState({
            passwordError: "Password cannot be empty"
         })
      }
      if(this.state.confirmPassword.length === 0) {
         this.setState({
            confirmPasswordError: "Confirm password cannot be empty"
         })
      }*/

   };

   
   // ============== Render ==============
   render() {

      const {
         firstName,
         lastName,
         email,
         username,
         password,
         confirmPassword,
         firstNameError,
         lastNameError,
         emailError,
         usernameError,
         passwordError,
         confirmPasswordError
      } = this.state;

      return (
         <div className="container">
            <div className="form-text">Sign up</div>
            
            <div className="form-div">
               <form className="form" onSubmit={this.handleOnSubmit}>
                  <div className="form-group-inline">
                     {/* first name */}
                     <div className="inline-container">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                           type="text" 
                           id="firstName" 
                           value={firstName} 
                           placeholder="First Name"
                           name="firstName"
                           onChange={this.handleOnChange}
                           onBlur={this.handleOnBlur}
                           autoFocus
                        />
                        {/* below will only appear if an error has occured in the given input */}
                        <div className="errorMessage">
                           {firstNameError && firstNameError}
                        </div>
                     </div>
                     {/* last name */}
                     <div className="inline-container">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                           type="text" 
                           id="lastName" 
                           value={lastName} 
                           placeholder="Last Name"
                           name="lastName"
                           onChange={this.handleOnChange}
                           onBlur={this.handleOnBlur}
                        />
                        <div className="errorMessage">
                           {lastNameError && lastNameError}
                        </div>
                     </div>
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
                              onBlur={this.handleOnBlur}
                           />
                           <div className="errorMessage">
                           {emailError && emailError}
                        </div>
                        </div>
                     </div>
                     {/* username */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="username">Username</label>
                           <input 
                              type="text" 
                              id="username" 
                              value={username} 
                              placeholder="Username"
                              name="username"
                              onChange={this.handleOnChange}
                              onBlur={this.handleOnBlur}
                           />
                           <div className="errorMessage">
                           {usernameError && usernameError}
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
                              onBlur={this.handleOnBlur}
                           />
                           <div className="errorMessage">
                           {passwordError && passwordError}
                        </div>
                        </div>
                     </div>

                     {/* confirm password */}
                     <div className="form-group-block">
                        <div className="block-container">
                           <label htmlFor="confirmPassword">Confirm Password</label>
                           <input 
                              type="text" 
                              id="confirmPassword" 
                              value={confirmPassword} 
                              placeholder="Confirm Password"
                              name="confirmPassword"
                              onChange={this.handleOnChange}
                              onBlur={this.handleOnBlur}
                           />
                           <div className="errorMessage">
                           {confirmPasswordError && confirmPasswordError}
                        </div>
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
