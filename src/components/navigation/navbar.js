import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoggedInLinks from './loggedInLinks'
import LoggedOutLinks from './loggedOutLinks'
import { FirebaseContext } from '../../contexts/firebaseContext'


class Navbar extends Component {
    static contextType = FirebaseContext
    state = {
        user: null,
        error: null
        //authenticated:null
    }

    componentDidMount() {
        this.listener = this.context.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user })
            }
        })
    }

    componentWillUnmount() {
        this.listener();
    }

    //const { auth, profile } = props;
    //console.log(auth);

    //if()
    render() {
        return (
            //this.stateuser ? <span>Loading...</span> :
            <nav className="nav-wrapper light-blue darken-2">
                <div className="container">
                    <Link to='/' className="brand-logo">Meal Plan</Link>
                    {this.state.user ? <LoggedInLinks /> : <LoggedOutLinks />}
                    {/* profile={profile} */}
                </div>
            </nav>
        )
    }
}

// const mapStateToProps = (state) => {
//     console.log(state)
//     return {
//         auth: state.firebase.auth,
//         profile: state.firebase.profile
//     }
// }

//export default connect(mapStateToProps)(Navbar)
export default Navbar