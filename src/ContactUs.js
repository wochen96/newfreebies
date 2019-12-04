import React, { Component } from 'react';
//import { Button, Navbar, Nav, Form, FormControl, Card, CardColumns } from 'react-bootstrap';
//import PostView from './PostView';
//import PostCardDetail from './PostCardDetail';
//import { db, auth } from './services/firebase';

const Contact = (props) => {
    const style = {
        height: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <div style={style}>
            <h1>CONTACT</h1>
            <p><span>Phone: </span>___________________</p>
            <p><span>Email: </span>___________________</p>
        </div>
    );
}

export default Contact;