import React, { Component } from 'react';
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator"; //validator will help us validate proper data input on client-side
import { toast } from 'react-toastify';
import Axios from "../utils/Axios";
// import jwtDecode from 'jwt-decode';
import checkIfUserIsAuth from '../utils/checkIfUserIsAuth';

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
      firstNameOnFocus: false,
      lastNameOnFocus: false,
      emailOnFocus: false,
      usernameOnFocus: false,
      passwordOnFocus: false,
      confirmPasswordOnFocus: false,
      isButtonDisabled: true, //an extra layer to make sure button is not enabled if errors exist
   };

   // after render,component did mount will run this logic every time
   componentDidMount() {
      console.log(this.props)
      let isAuth = checkIfUserIsAuth();
      if (isAuth) {
         this.props.history.push("/movie")
      }
      // we want to make sure we use token so that if logged in, we dont see the signup login page on hardcoded url
   };

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
            // below we are working to remove errorMessage of empty input once user starts typing for first and last name
            if (event.target.name === "firstName" || event.target.name === "lastName") {
               this.handleFirstNameAndLastNameInput(event);
            };

            // email validation
            if (event.target.name === "email") {
               this.handleEmailInput(event);
            };

            // username validation
            if(event.target.name === "username"){
               this.handleUsernameInput(event);
            };

            // password validation
            if(event.target.name === "password"){
               this.handlePasswordInput(event);
            };
            // confirmPassword Validation
            if(event.target.name === "confirmPassword") {
               this.handleConfirmPasswordInput(event);
            };
         }
      )
   };

   // for first and last name validation to be used in the callback function of handleOnChange
      // we are doing this because our handleOnChange callback is growing larger
   handleFirstNameAndLastNameInput = (event) => {
      if (this.state[event.target.name].length > 0) {
         if(isAlpha(this.state[event.target.name])){
            this.setState({
               [`${event.target.name}Error`]: "",
            }) 
         } else {
            this.setState({
               [`${event.target.name}Error`]: `${event.target.placeholder} can only be alphabet characters`,
               isButtonDisabled: true,
            })
         }
      } else {
         this.setState({
            [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
            isButtonDisabled: true,
         })
      }
   };

   handleEmailInput = (event) => {
      if (this.state.email.length > 0) {
         if(isEmail(this.state.email)){
            this.setState({
               emailError: "",
            })
         } else {
            this.setState({
               emailError: "Please enter an email with valid email format",
               isButtonDisabled: true,
            })
         }
      } else {
         this.setState({
            emailError: "Email cannot be empty",
            isButtonDisabled: true,
         })
      }
   };

   handleUsernameInput = (event) => {
      if(this.state.username.length > 0){
         if(isAlphanumeric(this.state.username)) {
            this.setState({
               usernameError: "",
            })
         } else {
            this.setState({
               usernameError: "Username can only have alphabet and numbers",
               isButtonDisabled: true,
            })
         }
      } else {
         this.setState({
            usernameError: "Username cannot be empty",
            isButtonDisabled: true,
         })
      }
   };

   handlePasswordInput = (event) => {
      // below is checking if confirmPassword has been touched and passwords do not match
      if(this.state.confirmPasswordOnFocus) {
         if (this.state.password !== this.state.confirmPassword){
            this.setState({
               confirmPasswordError: "Passwords not matching",
               isButtonDisabled: true,
            });
         } else {
            this.setState({
               confirmPasswordError: "",
            })
         }
      }
      if(this.state.password.length > 0){
         if(isStrongPassword(this.state.password)) {
            this.setState({
               passwordError: ""
            })
         } else {
            this.setState({
               passwordError: "Password must be longer than 8 characters, and include 1 uppercase, 1 lowercase, 1 number and special character",
               isButtonDisabled: true,
            })
         }
      } else {
         this.setState({
            passwordError: "Password cannot be empty",
            isButtonDisabled: true,
         })
      }
   };

   handleConfirmPasswordInput = (event) => {
      if(this.state.confirmPassword.length > 0){
         if(this.state.confirmPassword === this.state.password){
            this.setState({
               confirmPasswordError: ""
            })
         } else {
            this.setState({
               confirmPasswordError: "Passwords not matching",
               isButtonDisabled: true,
            })
         }
      } else {
         this.setState({
            confirmPasswordError: "Confirm Password cannot be empty",
            isButtonDisabled: true,
         })
      }
   };

   // for submit button
   // we will use our Axios instance here to add valid users to our database in the backend
   handleOnSubmit = async (event) => {
      event.preventDefault(); //this is necessary to avoid the app from refreshing
      try {
         // this we get from the input from this.state, and will be our second argument in the post request
         const userInputObj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
         };

         const success = await Axios.post("/api/users/sign-up", userInputObj);
         console.log(success);
         // react-toastify will bring up a bar if successful
         toast.success('User created. Proceed to login', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      } catch(e) {
         console.log(e.response.data.message)
         // react-toastify will bring up a bar if fail
         toast.error(e.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }
   };

   // handleOnBlur will detect if you leave an input field without having inputted the proper data
      // handleOnBlur will then be inserted into each of the input fields as the event for onBlur={}
   handleOnBlur = (event) => {
      // console.log(event.target.name)
      // console.log("Handle onBlur has been triggered")

      if(this.state[event.target.name].length === 0){
         this.setState({
            [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`
         })
      }
      // checking if input field is empty to deliver error message but below will cause a lot of unnecessary code and for all inputs to go onBlur at once, the ABOVE is dynamic to target individual onBLurs
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

   // dynamically handles when inputs have been "touched" to change onFocus for button enable/disable
   handleInputOnFocus = (event) => {
      if(!this.state[`${event.target.name}OnFocus`]){
         this.setState({
            [`${event.target.name}OnFocus`]: true,
         })
      }
   };

   // handle enabling button
   componentDidUpdate(prevProps, prevState){
      if(prevState.isButtonDisabled === true) {
         // we should only run the below if the prevState of the buttondisable is true
            // otherwise, we will run into an infinite loop once all fields are true and we click into confirmpassword
         // first we have to check that each field has been "touched", since initial state of error will be empty
         if (
            this.state.firstNameOnFocus &&
            this.state.lastNameOnFocus &&
            this.state.emailOnFocus &&
            this.state.usernameOnFocus &&
            this.state.passwordOnFocus &&
            this.state.confirmPasswordOnFocus 
         ) {
            // if the fields have been touched && there were no errors in filling out the form
            if(
               this.state.firstNameError.length === 0 &&
               this.state.lastNameError.length === 0 &&
               this.state.emailError.length === 0 &&
               this.state.usernameError.length === 0 &&
               this.state.passwordError.length === 0 &&
               // this.state.confirmPasswordError.length === 0
               this.state.password === this.state.confirmPassword
            ) {
               this.setState({
                  isButtonDisabled: false,
               })
            }
         }
      }
   };

   // ================= render =================
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
                           onFocus={this.handleInputOnFocus}
                           autoFocus
                        />
                        {/* below will only appear if an error has occurred in the given input */}
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
                           onFocus={this.handleInputOnFocus}
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
                              onFocus={this.handleInputOnFocus}
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
                              onFocus={this.handleInputOnFocus}
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
                              onFocus={this.handleInputOnFocus}
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
                              onFocus={this.handleInputOnFocus}
                           />
                           <div className="errorMessage">
                           {confirmPasswordError && confirmPasswordError}
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

export default Signup;
