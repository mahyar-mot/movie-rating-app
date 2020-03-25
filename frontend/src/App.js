import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-detail'
import MovieForm from './components/movie-form';
import { withCookies } from 'react-cookie';
let FontAwesome = require('react-fontawesome');


class App extends Component {

  state = {
      movies: [],
      selectedMovie: null,
      editedMovie: null,
      token: this.props.cookies.get('mr-token')
  }

  componentDidMount(){
    if(this.state.token){
      fetch('http://127.0.0.1:8000/api/movies', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}`,
        }
      }).then( res => res.json() )
        .then(res => this.setState({movies: res}))
        .catch( er => console.log(er));
    }else{
      window.location.href = '/'
    }
  }

  loadMovie = movie => {
    this.setState({selectedMovie: movie, editedMovie: null})
  }

  movieDeleted = delMovie => {
    const movies = this.state.movies.filter( movie => movie.id !== delMovie.id )
    this.setState( {movies: movies, selectedMovie: null})
  }

  movieEdited = ediMovie => {
     this.setState({editedMovie: ediMovie});
  }

  movieAdded = () => {
    this.setState({editedMovie: {title: '', description: ''}})
  }

  formCanceled = () => {
    this.setState({editedMovie: null})
  }

  createdMovie = movie => {
    this.setState( {movies: [...this.state.movies, movie]})
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <FontAwesome name="film"/>
            <span>Movie Rater</span>
          </h1>
          <div className="layout">
            <MovieList movies={this.state.movies}
                       movieClicked={this.loadMovie}
                       movieDeleted={this.movieDeleted}
                       movieEdited={this.movieEdited}
                       movieAdded={this.movieAdded}
                       token={this.state.token}
            />
            <div>
              { this.state.editedMovie ? (
                      <MovieForm movie={this.state.editedMovie}
                                 formCanceled={this.formCanceled}
                                 createdMovie={this.createdMovie}
                                 updatedMovie={this.loadMovie}
                                 token={this.state.token}
                      />
              ) : (
                      <MovieDetails movie={this.state.selectedMovie}
                                    updateMovie={this.loadMovie}
                                    token={this.state.token}
                      />
              ) } 
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withCookies(App);
