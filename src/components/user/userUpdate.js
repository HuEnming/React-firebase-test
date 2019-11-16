import React, { Component } from 'react'
import firebase from '../firebase/firebase'

class UserUpdate extends Component {

    state = {
        firstName: '',
        lastName: '',
        // email: '',
        // password: '',
        loading: false,
        userId: '',
        error: null
    }

    componentDidMount() {
        this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
            //()=>{} is necessary, can't use function(){} there, for reasons of 'this' 
            if (user) {
                this.setState({ userId: user.uid })
                //console.log(user.uid)
                let userRef = firebase.database().ref(`users/${user.uid}`)
                //console.log(UserRef)
                userRef.once('value', (snapshot) => {
                    //console.log(snapshot.val())
                    //setState add props without cover previous value
                    //this.setState((preState)=>{return {user:{...preState.user,...snapshot.val()}}})
                    this.setState((preState) => ({ ...preState.userId, ...snapshot.val() })
                    )
                    //this.setState({ user: { id: user.uid,... snapshot.val()} })
                    console.log(this.state)
                });
            } else {
                this.props.history.push('/');
            }
        })
    }

    componentWillUnmount() {
        this.removeAuthListener();
    }

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //             console.log(user)
    //             //var user = firebase.auth().currentUser;
    //             //console.log(user)
    //             // user.updateProfile({
    //             //     displayName: "Jane Q. User",
    //             //     photoURL: "https://example.com/jane-q-user/profile.jpg"
    //             // }).then(function () {
    //             //     console('OK')
    //             // }).catch(function (error) {
    //             //     // An error happened.
    //             // });
    //             this.setState({ user: {id:user.uid}})
    //             console.log(this.state.user.id)
    //         } else {
    //             this.props.history.push('/');
    //         }
    //     });
    // }



    //         this.setState({ loading: true });
    //         var userRef = firebase.database().ref('users/' + postId + '/starCount');
    // starCountRef.on('value', function(snapshot) {
    //   updateStarCount(postElement, snapshot.val());
    // });
    //         firebase.users().on('value', snapshot => {
    //             this.setState({
    //                 users: snapshot.val(),
    //                 loading: false,
    //             });
    //         });


    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { firstName, lastName } = this.state
        //firebase.database().ref('users').child(this.state.userId)
        firebase.database().ref(`users/${this.state.userId}`)
            .update({
                firstName,
                lastName,
            }).catch(error => {
                this.setState({ error })
            })
        //     .createUserWithEmailAndPassword(email, password)
        //     .then(authUser => {
        //         // Create a user in your Firebase realtime database
        //         return this.props.firebase
        //             .user(authUser.user.uid)
        //             .set({
        //                 firstName,
        //                 lastName,
        //             });
        //     })
        //     .then(authUser => {
        //         this.setState({
        //             firstName: '',
        //             lastName: '',
        //             error: null
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({ error })
        //     });
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Update Information</h5>
                    <div className="input-field">
                        <label className="active" htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" value={this.state.firstName||''} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <input type="text" id="lastName" value={this.state.lastName || ''} onChange={this.handleChange} />
                        <label className="active" htmlFor="lastName">Last Name</label>
                    </div>
                    {/* <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div> */}
                    <div className="input-field">
                        <button className="btn blue lighten-1 z-depth-0">Submit</button>
                        <div className="red-text center">
                            {this.state.error ? <p>{this.state.error}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default UserUpdate

