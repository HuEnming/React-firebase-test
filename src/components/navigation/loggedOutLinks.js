import React from 'react'
import { NavLink } from 'react-router-dom'

const LoggedOutLinks = () =>{
    return(
        <ul className="right">
            <li><NavLink to='/signup'>Sign up</NavLink></li>
            <li><NavLink to='/login'>Log in</NavLink></li>
        </ul>
    )
}

export default LoggedOutLinks