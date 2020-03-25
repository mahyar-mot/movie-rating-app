import React, { Component } from 'react';
let FontAwesome = require('react-fontawesome')

export default class MovieDetails extends Component{

    state = {
        highlighted: -1
    }

    highlightRate = high => evt =>{
        this.setState({highlighted: high});
    }
    starMaker(count){
        let star_comp = [];
        for (let i=1; i<6; i++){
        star_comp.push(<FontAwesome key={i} name="star" className={ i <= count ? "orange": '' } />)
        }
        return star_comp
    }
    rateClicked = stars => evt =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`,
            },
            body: JSON.stringify({stars: stars + 1 })

        }).then( res => res.json() )
          .then( res => this.getDetails() )
          .catch( err => console.log(err) );
    }

    getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`,
            }
        }).then( resp => resp.json())
          .then( res => this.props.updateMovie(res))
          .catch( err => console.log(err) );
    }
    render(){
        const mov = this.props.movie;
        return(
            <>
            {
                this.props.movie ? (
                    <div>
                        <h3>{mov.title}</h3>
                            {this.starMaker(mov.avg_rating)} ({mov.no_of_rating})
                        <p>{mov.description}</p>

                        <div className="rate-container">
                            <h2>Rate it !!!</h2>
                            {
                                [...Array(5)].map( (e, i) => {
                                    return <FontAwesome key={i}
                                                        name="star" 
                                                        className={ this.state.highlighted > i - 1 ? "purple": '' }
                                                        onMouseEnter={this.highlightRate(i)}
                                                        onMouseLeave={this.highlightRate(-1)}
                                                        onClick={this.rateClicked(i)} />
                                })
                            }
                        </div>
                    </div>
                ) : null
            }
            </>
        )
    }  
}