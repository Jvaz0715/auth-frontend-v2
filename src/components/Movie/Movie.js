import React, { Component } from 'react';
import axios from 'axios';

import "./Movie.css";

export class Movie extends Component {
   state = {
      movie: "",
   };

   handleOnChange = (e) => {
      this.setState({
         movie: e.target.value,
      },
      () => {
         // console.log(this.state.movie)
      }
      )
   };

   // because this is not a form we dont need event.preventDefault()... only if form we use preventdefault
   // use axios and async/await try/catch to make get request of movie api below
   onSubmit = async (e) => {
      try {
         let searchResults = await axios.get(`https://omdbapi.com/?apiKey=${process.env.REACT_APP_MOVIE_API}&s=${this.state.movie}`)

         console.log(searchResults)
      } catch(e) {
         console.log(e)
      }
   }
   // ================= render =================
   render() {
      return (
         <div className="movie-container">
            <div className="movie-search-container">
               <input 
                  type="text"
                  placeholder="Search Movies"
                  name="movie"
                  onChange={this.handleOnChange}
               />
               <button onClick={this.onSubmit}>Search</button>
            </div>
         </div>
      )
   }
}

export default Movie;
