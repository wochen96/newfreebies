import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route } from 'react-router-dom';
//import { BrowserRouter as Router, Link } from "react-router-dom";
import firebase from 'firebase/app';

// components
import Landing from './Landing';
import Dashboard from './Dashboard';
import AboutSection from './AboutSection';
import Features from './Features';
import Footer from './footer';

class App extends Component {
  constructor(props) {
    super(props);

    //this.refLanding = React.createRef();
    //const currentLanding = this.refLanding.current;

    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    this.authUnsub = firebase.auth().onAuthStateChanged(user => {
      console.log("auth change");
      this.setState({ user: user });
    });
  }
  // Update current user
  updateUser = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    if (firebase.auth().currentUser) {
      console.log("logged in");
      console.log(firebase.auth().currentUser.email);
      this.state.user = firebase.auth().currentUser;
      console.log(this.state.user.email);
    }
    else {
      console.log("not signed in");
    }
    console.log(this.state.user);
    //console.log(firebase.auth().currentUser);
    return (
      <div>
        <div>
          <Route exact path="/" render={() => {
            return (
              <main>
                <Landing updateUser={this.updateUser} />
                <Features />
                <AboutSection />
                <Footer />
              </main>
            );
          }} />

          {
            this.state.user &&
            <Route path="/home" render={() => {
              return (
                <Dashboard userEmail={this.state.user.email} />
              );
            }} />
          }

          {/* <Route path="/home" render={() => {
            return (
              <Dashboard user={this.state.user} />
            );
          }} /> */}

          {/* <Route path="/contact" component={Contact} /> */}

        </div>
      </div>
    );
  }
}
export default App;