import React, { Component } from 'react'
//import firebase from '../firebase/firebase'
import { FirebaseContext } from '../../contexts/firebaseContext'

class MealList extends Component {
    static contextType = FirebaseContext
    state = {
        //userId: '',
        mealLsit: null,
        error: null
    }

    componentDidMount() {
        this.removeAuthListener = this.context.auth.onAuthStateChanged((user) => {
            //()=>{} is necessary, can't use function(){} there, for reasons of 'this' 
            if (user) {
                //this.setState({ userId: user.uid })
                let mealLsit = []
                let mealLsitRef = this.context.db.collection('meals');
                let query = mealLsitRef.where('userId', '==', user.uid).get()
                    .then(snapshot => {
                        if (snapshot.empty) {
                            console.log('No matching documents.');
                            return;
                        }
                        console.log(snapshot)
                        snapshot.forEach(doc => {
                            console.log(doc.id, '=>', doc.data());
                            mealLsit.push({ ...doc.data(), mealId: doc.id })
                            this.setState((preState) => ({ ...preState, mealLsit, }))
                        });
                        //mealLsit.push({ ...snapshot.val(), mealId: snapshot.key })
                        //console.log(snapshot.val())
                        //this.setState((preState) => ({ ...preState, mealLsit, }))
                    })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });
                // firebase.database().ref().child('meals')
                //     .orderByChild('userId').equalTo(user.uid).on('child_added', (snapshot) => {
                //         mealLsit.push({ ...snapshot.val(), mealId: snapshot.key })
                //         //console.log(snapshot.val())
                //         this.setState((preState) => ({ ...preState, mealLsit, }))
                //     })
            } else {
                this.props.history.push('/');
            }
        })
    }

    componentWillUnmount() {
        this.removeAuthListener();
    }

    handleDelete = (foodId) => {
        // console.log(foodId)
        // firebase.database().ref(`meals/${foodId}`).on('child_removed', function(data) {
        //     console.log(data)
        //firebase.database().ref(`meals/${foodId}`).remove()
        //   })
        let deleteDoc = this.context.db.collection('meals').doc(foodId).delete()
        //firebase.database().ref(`meals/${foodId}`).remove()
            .then(() => {
                let mealLsit = this.state.mealLsit.filter(x => x.mealId !== foodId)
                this.setState({ mealLsit })
            }
            ).catch(error => {
                this.setState({ error })
            })

    }

    render() {
        const { mealLsit } = this.state
        //console.log(mealLsit)
        if (mealLsit) {
            return (
                <div className="row" >
                    {mealLsit.map((food, index) => (
                        <div className="col s12 m2" key={index}>
                            <div className="card">
                                <div className="card-image">
                                    <img src={food.imgUrl} alt={food.foodName}></img>
                                    <span className="card-title">{food.foodName}</span>
                                </div>
                                <div className="card-content">
                                    <p>Amount:{food.amount}</p>
                                    <p>Meal Date:{food.mealDate}</p>
                                    {
                                        Object.keys(food.nutrients).map((key, index) => (
                                            <p key={index}>{key}:{food.nutrients[key]}</p>
                                        ))
                                    }
                                </div>
                                <div className="card-action">
                                    <a href="/#">Detial</a><a href="/#" onClick={() => this.handleDelete(food.mealId)}>Delete</a>
                                </div>
                            </div>
                        </div>

                    ))}</div>
            )
        } else {
            return (<div>Loading...</div>)
        }
    }
}

export default MealList

