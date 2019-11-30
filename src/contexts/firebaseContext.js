import React, { Component, createContext } from 'react';
import { authProvider, auth, db } from './firebase'

export const FirebaseContext = createContext();

class FirebaseContextProvider extends Component {
    state = {
        authProvider, auth, db
    }
    render() {
        return (
            <FirebaseContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </FirebaseContext.Provider>
        )
    }
}

export default FirebaseContextProvider