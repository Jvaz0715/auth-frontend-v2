import React, { Component } from 'react';
import axios from 'axios';

export class MovieDetail extends Component {
   // create state that will hold the results we want to display which we get from our async componentDidMount
   state = {
      poster: "",
      title: "",
      year: "",
      plot: "",
      isLoading: true, //if page takes long to load, we want to let client know something is being worked on
   }

   async componentDidMount() {
      try{
         let result = await axios.get(`https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&t=${this.props.match.params.movieTitle}`);

         console.log('result of movie detail axios get');
         console.log(result);
      } catch(e) {
         console.log(e)
      }
   }

   // workout showMoviedetail() function video mm:1:41:08

   // ================= render =================
   render() {
      console.log(this.props)
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
