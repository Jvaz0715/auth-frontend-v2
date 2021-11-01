import React, { Component } from 'react';
import axios from 'axios';

import "./MovieDetail.css";

export class MovieDetail extends Component {
   // create state that will hold the results we want to display which we get from our async componentDidMount
   state = {
      poster: "",
      title: "",
      year: "",
      plot: "",
      isLoading: true, //if page takes long to load, we want to let client know something is being worked on
   }
   // this componentdidmount is most important as we are querying right away! otherwise it would only show up "on refresh"
   async componentDidMount() {
      try{
         let result = await axios.get(`https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&t=${this.props.match.params.movieTitle}`);

         // console.log('result of movie detail axios get');
         // console.log(result);
         this.setState({
            poster: result.data.Poster,
            title: result.data.Title,
            year: result.data.Year,
            plot: result.data.Plot,
            isLoading: false,
         })
      } catch(e) {
         console.log(e)
      }
   };

   // workout showMoviedetail() function video mm:1:41:08
   showMovieDetail = () => {
      return(
         <div className="movie-detail-container">
            <img src={this.state.poster} alt={this.state.title} />
            <h1>{this.state.title} ({this.state.year})</h1>
            <p>{this.state.plot}</p>
         
         </div>
      )
   }

   // ================= render =================
   render() {
      // console.log(this.props)
      return (
         <div>
            {/* if page is loading display loading sign, otherwise display movie details */}
            {this.state.isLoading ? (
               <div>Page Loading...</div>
            ):(
               this.showMovieDetail()
            )}
         </div>
      )
   }
};

export default MovieDetail;
