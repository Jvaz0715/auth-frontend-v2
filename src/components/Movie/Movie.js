import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./Movie.css";

export class Movie extends Component {
   state = {
      movie: "",
      moviesResultArray: [],
   };

   // we use componentDidMount to keep our search persisting if and when searched a movie
      // since component did mount runs after state is rendered/updated, if there is a set session it will grab it
      // we have to make it an async await
   
   async componentDidMount() {
      try{
         let searchedMovieTitle = window.sessionStorage.getItem("searchedMovieTitle");
         // if there is a session stored movie title: run logic
         if (searchedMovieTitle) {
            let searchResults = await axios.get(`https://omdbapi.com/?apiKey=${process.env.REACT_APP_MOVIE_API}&s=${searchedMovieTitle}`);

            this.setState({
               moviesResultArray: searchResults.data.Search,
            })
         }
      } catch(e) {
         console.log(e)
      }
   }

   handleOnChange = (e) => {
      this.setState(
         {
            movie: e.target.value,
         },
         () => {
            // console.log(this.state.movie)
         }
      );
   };

   // because this is not a form we dont need event.preventDefault()... only if form we use preventdefault
   // use axios and async/await try/catch to make get request of movie api below
   onSubmit = async (e) => {
      try {
         let searchResults = await axios.get(`https://omdbapi.com/?apiKey=${process.env.REACT_APP_MOVIE_API}&s=${this.state.movie}`)

         // console.log(searchResults.data.Search)
         //in order to get our search to persist on the move page even after we go into a movie detail and want to to return
            // we need to set a sessionStorage key
         window.sessionStorage.setItem("searchedMovieTitle", this.state.movie);
         
         this.setState({
            moviesResultArray: searchResults.data.Search,
         })
      } catch(e) {
         console.log(e)
      }
   };

   // along with rendering results withing our render, we could also create a function that will just be called in render

   showMovieList = () => {
      return this.state.moviesResultArray.map(item => {
         return (
            <Link
               to={{
                  pathname: `/movie-detail/${item.Title}`,
                  search: `?t=${item.Title}`,
               }}
               key={item.imdbID}
            >
               <div className="movie-info-div" style={{width: 300 }}>
                  <img src={item.Poster} alt={item.Title}/>
                  {item.Title} ({item.Year})
               </div>
            </Link>
         )
      })
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

            <div className="movie-results-div">
               {this.showMovieList()}
            </div>
         </div>
      )
   }
}

export default Movie;
