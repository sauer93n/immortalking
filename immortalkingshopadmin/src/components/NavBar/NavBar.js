import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import './NavBar.css';

class NavBar extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Link to="/" className="navbar-brand">Admin Panel</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Товары" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/products">Список товаров</Link>
                                <Link className="dropdown-item" to="/products/add">Добавить товар</Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default NavBar;