import React from 'react';
let FontAwesome = require('react-fontawesome')


function MovieList(props){

    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    };

    const removeClicked = movie => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`,{
            method: "DELETE",
            headers: {
                "Authorization": `Token ${this.props.token}`,
                'Content-Type': "application/json"
            }
        }).then( resp => props.movieDeleted(movie) )
          .catch( err => console.log(err) )
    };

    const editClicked = movie => {
        props.movieEdited(movie);
    }

    const addMovieClicked = () => {
        props.movieAdded();
    }
    console.log(props.movies)
    return (
        <div>
            {
                props.movies.map(
                    mo => <div key={mo.id} className="movie-item">
                            <h3 
                               onClick={movieClicked(mo)}>
                                   {mo.title}
                            </h3>
                            <FontAwesome name="edit" onClick={() => editClicked(mo)}/>
                            <FontAwesome name="trash" onClick={() => removeClicked(mo)}/>
                          </div>  
                )
            }
            <button onClick={addMovieClicked}>Add new Movie</button>
        </div>
    )
}

export default MovieList; 