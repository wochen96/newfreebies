import React, { Component } from "react";
import firebase from "firebase/app";
export default class SignOut extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({ authenticated: user != null });
        });
    }
    componentWillUnmount() {
        this.authUnsub();
    }
    handleSignOut(evt) {
        evt.preventDefault();
        this.setState({ working: true, errorMessage: undefined });
        firebase.auth().signOut()
            .catch(err => this.setState({ errorMessage: err.message }))
        //firebase.auth().signOut().catch((error) => alert(error));
            // .then(() => { console.log("Shoud log out"); this.setState({ working: false }); })
            .then(window.location = "/");
    }
    render() {
        let user = firebase.auth().currentUser;
        return (
            <button className="btn btn-outline-secondary" onClick={evt => this.handleSignOut(evt) } style={{ }}>
                Sign Out
                    </button>
        )
    }
}