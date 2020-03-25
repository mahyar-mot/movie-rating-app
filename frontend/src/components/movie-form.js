import React, { Component } from 'react';


export default class MovieForm extends Component{

    state = {
        editedMovie: this.props.movie
    }

    cancelClicked = () => {
        this.props.formCanceled()
    }

    inputChanged = event => {
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value;
        this.setState({editedMovie: movie})
    }

    saveClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${this.props.token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify(this.state.editedMovie)
          }).then( res => res.json() )
            .then(res => this.props.createdMovie(res) )
            .catch( er => console.log(er));
    }
    updateClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${this.props.token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify(this.state.editedMovie)
          }).then( res => res.json() )
            .then(res => this.props.updatedMovie(res) )
            .catch( er => console.log(er));
    }

    render(){
        const isDisabled = this.props.movie.title.length === 0 || this.props.movie.description.length === 0;
        return(
            <>
                <span>Title</span><br/>
                <input type="text" name="title" value={this.props.movie.title} onChange={this.inputChanged}/><br/>
                <span>Description</span><br/>
                <textarea name="description" value={this.props.movie.description} onChange={this.inputChanged}/><br/>
                { this.props.movie.id ? (
                    <button disabled={isDisabled} onClick={this.updateClicked}>Update</button>
                ) : (
                    <button disabled={isDisabled} onClick={this.saveClicked}>Save</button>
                ) }
                &nbsp;
                <button onClick={this.cancelClicked}>Cancel</button>
            </>
        )
    }  
}