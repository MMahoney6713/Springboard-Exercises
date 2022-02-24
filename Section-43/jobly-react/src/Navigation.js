import React from "react";
import { NavLink } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import { capitalizeFirst } from "./helpers";

import Routes from "./Routes";

const Navigation = ({pageTitle, navLinks}) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <LinkContainer to={'/'}>
                        <Navbar.Brand>{pageTitle}</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {navLinks.map(link => (
                            <LinkContainer to={`/${link}`} key={link}>
                                <Nav.Link>{capitalizeFirst(link)}</Nav.Link>
                            </LinkContainer>
                        ))}
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
        

    )
}

export default Navigation;