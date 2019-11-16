import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { Link, Redirect, withRouter } from 'react-router-dom'
//import { signUp } from '../../store/actions/authActions'
//import app from "../firebase/firebase"
//import { withRouter } from 'react-router-dom'
//import { Link } from 'react-router-dom'
//import Firebase, { FirebaseContext } from '../../components/firebase/firebase'
import firebase from '../firebase/firebase'

class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: null
    }
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()

        //Firebase.initializeApp(config);
        //this.props.signUp(this.state)
        const { email, password,firstName,lastName } = this.state
        console.log(firebase)
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return firebase.database().ref('users/' + authUser.user.uid).set({
                    firstName,
                    lastName,
                  });
              })
            .then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
                this.setState({ error })
            });
    }
    render() {
        //const { auth, authError } = this.props
        // if (auth.uid)
        //     return <Redirect to='/' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn blue lighten-1 z-depth-0">Sign up</button>
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
//         auth: state.firebase.auth,
//         authError: state.auth.authError
//     }
// }

// const mapdispatchToProps = (dispatch) => {
//     return {
//         signUp: (newUser) => dispatch(signUp(newUser))
//     }
// }

export default SignUp

