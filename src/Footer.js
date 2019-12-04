import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="py-5 bg-dark">
                <div className="container">
                <p className="m-0 text-center text-white">Copyright &copy; Freebies 2019</p>
                </div>

            </footer>
            // <footer>
            //     <Navbar bg="dark" variant="dark">
            //         <Nav className="navbar-nav nav-fill w-100">

            //             <Nav.Item>
            //                 <Nav.Link href="/contact_us">Contact Us</Nav.Link>
            //             </Nav.Item>

            //             <Nav.Item>
            //                 <Nav.Link href="#aboutUs">About Us</Nav.Link>
            //             </Nav.Item>
            //         </Nav>
            //     </Navbar>
            // </footer>
        );

    }
 }

export default Footer;