import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./style.css";

class NavbarComponent extends Component {
    render() {
        return (
            <Navbar >
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>

                    <Nav className="me-auto">
                        <NavLink to="/home" className="text-secondary nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/sair" className="nav-link text-white">
                            Sair
                        </NavLink>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default NavbarComponent;