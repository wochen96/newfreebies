import React, { Component } from 'react';
import firebase from 'firebase/app';
import { HashLink as Link } from 'react-router-hash-link';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged(user => {
            if (user) { // user is successfully logged in
                this.setState(state => {
                    state.user = user;
                    return state;
                });
                this.props.updateUser(user);
            } else { // user is not logged in
                this.setState(state => {
                    state.user = null;
                    return state;
                });
                this.props.updateUser(null);
            }
        });
    }
    componentWillUnmount() {
        this.authUnRegFunc.off();
    }
    // Sign in using Google popup authentication
    signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).catch((error) => alert(error));
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                window.location = '/home';
            }
        })
    }
    render() {
        return (
            <section className="landing-splash py-5">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-12">
                            <h1 className="display-3 text-white mt-5 mb-2">Welcome to Freebies!</h1>
                            <p className="lead mb-5 text-white">Our goal is to help students navigate all of the free resources that University of Washington has to offer.</p>
                        </div>
                        <button type="button" onClick={this.signIn} className="btn btn-primary ml-3">
                            Login
                        </button>
                        <div className="smooth-scroll">
                            <Link smooth to="#features">
                                <button type="button" className="btn btn-secondary ml-3">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Landing;