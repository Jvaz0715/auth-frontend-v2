import jwtDecode from "jwt-decode";

import setAxiosAuthToken from "./setAxiosAuthToken";

// check if user is authorized
const checkIfUserIsAuth = () => {
   // check if token exists, if it doesn't return false
   // if it exists check if token is valid and not expired
   let getJwtToken = window.localStorage.getItem("jwtToken");
   if(getJwtToken) {
      const currentTime = Date.now() / 1000;
      let decodedToken = jwtDecode(getJwtToken);
      if(decodedToken.exp < currentTime) {
         setAxiosAuthToken(null);
         return false;
      } else {
         setAxiosAuthToken(getJwtToken)
         return true;
      }
   } else {
      return false;
   }
};

export default checkIfUserIsAuth;