import React, { Component } from 'react';
import { isEmpty, isEmail } from "validator";
import { toast } from 'react-toastify';
import Axios from "../utils/Axios";
import jwtDecode from 'jwt-decode';
import checkIfUserIsAuth from '../utils/checkIfUserIsAuth';
import setAxiosAuthToken from '../utils/setAxiosAuthToken';


export class Login extends Component {
   state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      emailOnFocus: false,
      passwordOnFocus: false,
      isButtonDisabled: true,
   };
   // after render,component did mount will run this logic every time
   componentDidMount() {

      let isAuth = checkIfUserIsAuth();
      if (isAuth) {
         this.props.history.push("/movie")
      }
      // we want to make sure we use token so that if logged in, we dont see the signup login page on hardcoded url
   };

   handleOnChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      }, () => {
         // email validation
         if (event.target.name === "email"){
            if(isEmpty(this.state.email)){
               this.setState({
                  emailError: "Email cannot be empty",
                  isButtonDisabled: true,
               })
            } else {
               if(isEmail(this.state.email)){
                  this.setState({
                     emailError: "",
                  })
               } else {
                  this.setState({
                     emailError: "Please enter a valid email address",
                     isButtonDisabled: true,
                  })
               }
            }
         };

         // password validation
         if (event.target.name === "password") {
            if (isEmpty(this.state.password)){
               this.setState({
                  passwordError: "Password cannot be empty",
                  isButtonDisabled: true,
               })
            } else {
               this.setState({
                  passwordError: "",
               })
            }
         };

         // button disable toggle with onFocus touched true and false
         if(this.state.emailOnFocus && this.state.passwordOnFocus) {
            if (
               this.state.emailError.length === 0 &&
               this.state.passwordError.length === 0 &&
               this.state.password.length >= 8
            ) {
               this.setState({
                  isButtonDisabled: false,
               })
            } else {
               this.setState({
                  isButtonDisabled: true,
               })
            }
         };
         
      });
   };
   // if we don't use this function, our button will be enabled as soon as our app is running because technically there are no errors
   // we need to make sure there are no errors after each input has been "touched"
   handleInputOnFocus = (event) => {
      if (!this.state[`${event.target.name}onFocus`]) {
         this.setState({
            [`${event.target.name}OnFocus`]: true,
         })
      }
   };

   // for form submit
   // always give onSubmit functions an event.preventDefault() to avoid auto refresh on submit
   handleOnSubmit = async (event) => {
      event.preventDefault();
      try {
         let result = await Axios.post("api/users/login", {
            email: this.state.email,
            password: this.state.password,
         })

         // we also need to add our jwt token to localstorage to be logged in
         let jwtToken = result.data.payload; //we use jwt decode to actually breakdown what we get back as a token
         let decodedToken = jwtDecode(jwtToken);

         // here we pass this.props.handleUserLogin passed down from app that will take the decodedToken as the argument
         this.props.handleUserLogin(decodedToken);
         localStorage.setItem("jwtToken", jwtToken);
         setAxiosAuthToken(jwtToken); //this will automatically set our headers so we do not need to keep checking headers for each api call

         // once we have token set, we need to push into the history of login url and change it to /movie when successfully logged in
         this.props.history.push("/movie");
         
         toast.success(result.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      } catch(e) {
         // we need to differentiate between status code 429 and 404 as one is wrong password and another is rate limit exceeded
         if(e.response.status === 429) {
            toast.error(e.response.data, {
               position: "top-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         } else {
            toast.error(e.response.data.payload, {
               position: "top-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         }
      }
   };

   // ================= render =================
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
                              onFocus={this.handleInputOnFocus}
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
                              onFocus={this.handleInputOnFocus}
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
