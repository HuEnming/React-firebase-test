import React from 'react'
import { NavLink } from 'react-router-dom'
//import { connect } from 'react-redux'
import firebase from '../firebase/firebase'

const logOutUser = () => {
    firebase.auth().signOut()
        .then(window.location = "/")
        .catch(error => {
            this.setState({ error })
        })
}

const LoggedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/create'>Add plan</NavLink></li>
            <li><NavLink to='/edituser'>Edit Info</NavLink></li>
            <li><NavLink to='/addmeal'>Add Meal</NavLink></li>
            <li><a href="/#" onClick={logOutUser}>Log out</a></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1"></NavLink></li>
        </ul>
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signOut: () => dispatch(signOut())
//     }
// }

//export default connect(null, mapDispatchToProps)(LoggedInLinks)
export default LoggedInLinks
