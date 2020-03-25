import React, { Component } from 'react';
import { withCookies } from 'react-cookie';


export default withCookies(class Login extends Component{

    state = {
        credentials: {
            username: "",
            password: "",
        },
        isLoginView: true
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred})
    }

    login = event => {
        if (this.state.isLoginView){
            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(this.state.credentials)
              }).then( res => res.json() )
                .then(res => {
                    this.props.cookies.set('mr-token', res.token)
                    window.location.href = '/movies'
                }
                )
                .catch( er => console.log(er));
        }else{
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(this.state.credentials)
              }).then( res => res.json() )
                .then(res => {
                    this.setState({isLoginView: !this.state.isLoginView})
                }
                )
                .catch( er => console.log(er));
        }

    }

    swapView = () => {
        this.setState({isLoginView: !this.state.isLoginView})
    }
    render(){
        return (
            <div className="login-container">
                <h1>
                    { this.state.isLoginView ? 'Login': 'Create a new Account'}
                </h1>
                <span>Username</span><br/>
                <input type="text" name="username" value={this.state.credentials.username} onChange={this.inputChanged}/><br/>
                <span>Password</span><br/>
                <input type="password" name="password" value={this.state.credentials.password} onChange={this.inputChanged}/><br/>
                <button onClick={this.login}>
                    { this.state.isLoginView ? 'Login': 'Register'}    
                </button> &nbsp;
                <button onClick={this.swapView}>
                    { this.state.isLoginView ? 'Create an Account': 'back to Login'}
                </button>
            </div>
        )
    }
})
