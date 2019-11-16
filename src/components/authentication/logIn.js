import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { logIn } from '../../store/actions/authActions'
//import { Redirect } from 'react-router-dom'
//import { FirebaseContext } from '../firebase'
//import { withFirebase } from '../firebase/firebase'
//import PropTypes from 'prop-types'
import firebase from '../firebase/firebase'

class LogIn extends Component {

    state = {
        email: '',
        password: '',
        error: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // handleGoogleSignIn = e => {
    //     var provider = new firebase.auth.GoogleAuthProvider();
    //     firebase.auth().signInWithPopup(provider).then(function(result) {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         var token = result.credential.accessToken;
    //         // The signed-in user info.
    //         var user = result.user;
    //         // ...
    //       }).catch(function(error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         // The email of the user's account used.
    //         var email = error.email;
    //         // The firebase.auth.AuthCredential type that was used.
    //         var credential = error.credential;
    //         // ...
    //       });
    //       firebase.auth().signInWithRedirect(provider);
    //       firebase.auth().getRedirectResult().then(function(result) {
    //         if (result.credential) {
    //           // This gives you a Google Access Token. You can use it to access the Google API.
    //           var token = result.credential.accessToken;
    //           // ...
    //         }
    //         // The signed-in user info.
    //         var user = result.user;
    //       }).catch(function(error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         // The email of the user's account used.
    //         var email = error.email;
    //         // The firebase.auth.AuthCredential type that was used.
    //         var credential = error.credential;
    //         // ...
    //       });
    // }

    handlePasswordReset = e => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(firebase)
        const { email, password } = this.state;
        console.log(email, password)
        //this.props.firebase
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    email: '',
                    password: '',
                    error: null
                });
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        //const { authError, auth } = this.props
        // if (auth.uid)
        //     return <Redirect to='/' />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Log In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn blue lighten-1 z-depth-0">Log in</button>&nbsp;&nbsp;
                        <a href="/#" onClick={() => this.handlePasswordReset()}>Forgot password</a>
                        <div className="red-text center">
                            {this.state.error ? <p>{this.state.error.message}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         authError: state.auth.authError,
//         auth: state.firebase.auth
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         logIn: (creds) => dispatch(logIn(creds))
//     }
// }
//export default LogIn
//LogIn.prototype={}
// PropTypes.any — the prop can be of any data type
// PropTypes.bool — the prop should be a boolean
// PropTypes.number — the prop should be a number
// PropTypes.string — the prop should be a string
// PropTypes.func — the prop should be a function
// PropTypes.array — the prop should be an array
// PropTypes.object — the prop should be an object
// PropTypes.symbol — the prop should be a symbol

export default LogIn