import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

// components
import Header from './header';
import Footer from './footer';
import MidleSection from './MidleSection'

import 'firebase/firestore'


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDefiniteSelected: 'limited',
            searchCheck: 'no'
        }
        //console.log('the user name is: ' + this.props.user.email);

        this.refUpdate = React.createRef();
        this.refMidle = React.createRef();
    }

    changeDefinite = event => {
        this.setState({
            isDefiniteSelected: event.target.value,
            searchCheck: 'no'
        }, () => {
            this.onUpdate();
        })
    }

    searchDatabase = (event) => {
        const currentMidle = this.refMidle.current;
        currentMidle.searchDatabase();
        this.setState({
            searchCheck: "yes"
        })
    }

    onUpdate = () => {
        const currentMidle = this.refMidle.current;
        currentMidle.getDataToDisplay();
    }


    render() {
        return (
            <Router>
                <div className="dashboard">
                    <Header changeDefinite={this.changeDefinite} searchDatabase={this.searchDatabase} userEmail={this.props.userEmail} onUpdate={this.onUpdate} />                    

                    <Route path="/home" render={() => {
                        return (
                            <MidleSection isDefiniteSelected={this.state.isDefiniteSelected} ref={this.refMidle} searchCheck={this.state.searchCheck} userEmail={this.props.userEmail} />
                            
                        );
                    }} />

                    <Footer style={{ position: 'absolute', bottom: '0', right: '0' }} />
                </div>
            </Router>






        );

    }
}

export default Dashboard;