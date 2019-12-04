import React, { Component } from 'react';
import * as firebase from 'firebase'


class TestFirebase extends Component{
    render() {
        // let rootRef = firebase.database().ref();
        // let peopleRef = firebase.database().ref('posts/f0NqdMx8XEfHXTB8s4Fp');
        // console.log(peopleRef.description)
        let peopleRef = firebase.database().ref('posts').child('f0NqdMx8XEfHXTB8s4Fp');
        console.log(peopleRef.toJSON())
        peopleRef.once('value', (snapshot) => {
            let pv = snapshot.val();
            console.log("inside")
            console.log(pv); //=> { age: 35, petName: "Spot" }
            //can do something else with amitValue (e.g., assign with this.setState())
        });
        return(
            <div>
            <h1> Firebase test</h1>
            {/* <h2>{peopleRef.toString}</h2> */}
            </div>
           
        );
    }

}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    return xmlHttp.responseText;
}
export default TestFirebase;