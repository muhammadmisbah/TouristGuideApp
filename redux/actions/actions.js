import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';


export function signin(email, password){
    return (dispatch)=>{        
        Actions.map();
        
        firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
        dispatch({type: "SIGN_IN",
        user: user,
        data: true})
        ///////
    }).catch((error)=>{alert(error.message); Actions.pop()})
    }
}
export function signup(email, password, name){
    return (dispatch)=>{
        Actions.map();
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( (user) =>{
        user.updateProfile({
            displayName: name,
        });
        firebase.database().ref('users/').child(user.uid).set({
            name: name,
            email: email,
            password: password,
        }).then((data)=>{
        dispatch({type: "SIGN_UP",
        user: user,
        data: true})
        //////
    }).catch((error)=>{alert(error.message, 'Kindly SignUp again'); {firebase.auth().currentUser && firebase.auth().currentUser.delete()}; Actions.pop()})        
    })//.catch((error)=>{alert(error.message); Actions.pop()})
    }
}

export function signout(){
    return (dispatch)=>{
        Actions.first();        
        firebase.auth().signOut().then(()=>
            {
            dispatch(
                {type: "SIGN_OUT"}
            )
    }        
    )//.catch((error)=>{alert(error.message)})
}
}
// export function nearby(loc, place){
//     return async (dispatch)=>{
//         //async()=>{
// try {
//   //let location = placeSearch
//   let key = 'AIzaSyBd7TZVgjJKgp-Swtz807nNuaW4IG8fGEk'
//   let resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&radius=2000&type=${place}&key=AIzaSyCSDc8XUj2qEpzcStMWgHQVUpXel_v4kOg`)
//   // console.log(resp, "res hai get direction ka")
//   let respJson = await resp.json();
//   let result = respJson.results
//   // Actions.PlaceList({ searchType, respJsonn });
//   console.log(result, "result of getNearByPlaces")
//   // this.setState({ NearByPlacesData: respJson.results })
// //  this.props.place(result);
//   Actions.index();
//   dispatch({type: 'PLACES', places: result})
  
// } catch (error) {
//   return (error) => { console.log(error, 'error error error') }
// }
// //}
//     }
// }