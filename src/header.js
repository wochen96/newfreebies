import React, { Component } from 'react';
//import logo from './logo.svg';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Navbar, Nav, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import CreateModal from './CreateModal';
//import './default.css';
import SignOut from "./SignOut";

class Header extends Component {

    constructor(props) {
        super(props);

        this.refCreateView = React.createRef();
    }

    onAddClick = () => {
        const currentCreateView = this.refCreateView.current;

        if (currentCreateView.state.createModalShow == false) {
            currentCreateView.createOpenModal();
        }
    }

    render() {
        return (
            <header className="App-header">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/home" id="logo">
                        <img
                            src="img/freebies.png"
                            width="35"
                            height="45"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                        <span>Freebies</span>
                    </Navbar.Brand>
                    <Nav className="navbar-nav nav-fill w-100">

                        <Nav.Item className="mt-2 newPostContainer">
                            <CreateModal ref={this.refCreateView} userEmail={this.props.userEmail}></CreateModal>
                            <Button variant="info" onClick={this.onAddClick}>New Post</Button>
                        </Nav.Item>

                        <Nav.Item className="ml-5 mt-4 searchContainer">
                            <FormGroup inline>
                                <InputGroup>
                                    <FormControl
                                        id="search" placeholder="Search for freebies" className="edit_text"
                                        type="input"
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                this.props.searchDatabase();
                                            }
                                        }}
                                    />
                                    <Button value="yes" variant="outline-info" onClick={this.props.searchDatabase}>Search</Button>
                                </InputGroup>
                            </FormGroup>

                            {/* <input id="search" type="text" placeholder="Search for freebies" className="edit_text" />
                            <Button value="yes" variant="outline-info" onClick={this.props.searchDatabase}>Search</Button> */}
                        </Nav.Item>

                        <Nav.Item>
                            <div class="loginInfo">Filter by time limit</div>
                            <div id="filterButton">
                                <span class="b">
                                    <Nav.Item>
                                        <Button variant="secondary" size="sm" value="limited" onClick={this.props.changeDefinite}>Limited</Button>
                                    </Nav.Item>
                                </span>
                                <span class="b">
                                    <Nav.Item>
                                        <Button variant="secondary" size="sm" value="unlimited" onClick={this.props.changeDefinite}>Unlimited</Button>
                                    </Nav.Item>

                                </span>
                            </div>
                        </Nav.Item>

                        <Nav.Item class="loginInfo">
                            <em>{this.props.userEmail}</em>
                            <Nav.Link href="#signout"><SignOut /></Nav.Link>

                        </Nav.Item>



                    </Nav>
                </Navbar>
            </header>
        );

    }
}

export default Header;