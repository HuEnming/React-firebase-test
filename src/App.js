import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/navigation/navbar'
import LogIn from './components/authentication/logIn'
import SignUp from './components/authentication/signUp'
import UserUpdate from './components/user/userUpdate'
import AddMeal from './components/meal/addMeal'
import MealList from './components/meal/mealList'

class App extends Component {
  render() {
    //console.log(this.props)
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={MealList} />
            <Route path='/mealList' component={MealList} />
            <Route path='/login' component={LogIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/edituser' component={UserUpdate} />
            <Route path='/addmeal' component={AddMeal} />
            {/* <Route path='/create' component={CreateNotice} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;