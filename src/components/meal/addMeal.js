import React, { Component } from 'react'
import firebase from '../firebase/firebase'
import axios from 'axios'

class AddMeal extends Component {

    state = {
        userId:'',
        foodName: '',
        amount: 0,
        mealTime: '',
        mealDate: '',
        nutrients: '',
        description: '',
        error: null
    }
    
    componentWillMount() {
        this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ userId: user.uid })
            } else {
                this.props.history.push('/');
            }
        })
    }

    componentWillUnmount() {
        this.removeAuthListener();
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { foodName, mealTime, mealDate, amount, description, userId } = this.state
        const url = `https://api.edamam.com/api/food-database/parser?ingr=${foodName} 
        &app_id=9ccfd3ea&app_key=422e0ba66ae6c563f47a9fe391a437f0`
        axios.get(url).then(response => {
            const result = response.data
            
            //const nutrients = result.nutrients
            const imgHints = result.hints.filter((item) => { return item.food.hasOwnProperty('image') })
            const imgUrl = imgHints.length > 0 ? imgHints[1].food.image : ''
            //console.log(imgHints.length)
            //console.log(imgHints[1].food.image)
            const nutrients = result.parsed[0].food.nutrients
            return [{
                calories: nutrients.ENERC_KCAL,
                protein: nutrients.PROCNT,
                fat: nutrients.FAT,
                cholesterol: nutrients.CHOCDF,
                fibre: nutrients.FIBTG
            },imgUrl]
        }).then(([nutrients,imgUrl]) => {
            const timestamp = new Date().toLocaleString()
            console.log(timestamp)
            firebase.database().ref('meals/').push({
                amount, foodName, mealTime, mealDate, nutrients, description, imgUrl, userId, timestamp
            })
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
                    <h5 className="grey-text text-darken-3">Add a Meal</h5>
                    <div className="input-field">
                        <input type="text" id="foodName" onChange={this.handleChange} />
                        <label htmlFor="foodName">Food Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" id="amount" onChange={this.handleChange} />
                        <label htmlFor="amount">Amount</label>
                    </div>
                    <div className="input-field">
                        <select className="browser-default" id="mealTime" onChange={this.handleChange} >
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                        <label className="active" >MealTime</label>
                    </div>
                    <div className="input-field">
                        <input type="date" id="mealDate" onChange={this.handleChange} />
                        <label className="active" htmlFor="mealDate">Meal Date</label>
                    </div>
                    <div className="input-field">

                        <textarea rows="20" cols="30" id="description" onChange={this.handleChange}>
                        </textarea>
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="input-field">
                        <button className="btn blue lighten-1 z-depth-0">Submit</button>
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

export default AddMeal

