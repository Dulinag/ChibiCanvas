import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function NewLandingPage() {
  return (
    <div>

<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Chibi Canvas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <Nav.Link href="/Contact">Contact</Nav.Link>

            <Nav.Link href="/ShoppingCart">          <ShoppingCartIcon /> </Nav.Link>

          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <h1>Items in cart</h1>
      <p>Discover amazing products!</p>
    </div>
  );
}

export default NewLandingPage;