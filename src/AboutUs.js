import React, { Component } from 'react';
//import { Button, Navbar, Nav, Form, FormControl, Card, CardColumns } from 'react-bootstrap';
//import PostView from './PostView';
//import PostCardDetail from './PostCardDetail';
//import { db, auth } from './services/firebase';

const AboutUs = (props) => {
    const style = {
        height: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <div style={style}>
            <p>Our company is established on October 2, 2019.</p>
            <p>Our mission is to help students take advantage of the free resources that UW campus provides.</p>
        </div>
    );
}

export default AboutUs;