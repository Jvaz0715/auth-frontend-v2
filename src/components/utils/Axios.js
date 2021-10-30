import axios from "axios"; // to make CRUD requests

// we are making an axios instance here
   // REF: Axios Documentation https://axios-http.com/docs/instance

const Axios = axios.create({
   baseUrl: process.env.NODE_ENV === "development" 
      ? "http://localhost:8080" 
      : "DEPLOYED CLOUD ADDRESS",
   timeout: 50000
});

export default Axios;