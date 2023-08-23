import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from 'styled-components';

const BigDiver = styled.div`
  background-color: black;
  padding-bottom: 40%;
  padding-top: 5%;
  color: white;
`;

const CartItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;

const CheckoutButton = styled.button`
  background-color: #f0c14b;
  border: 1px solid #a88734;
  border-radius: 3px;
  color: #111;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #ff9900;
    border-color: #9c7e31;
  }
`;

function CartPage() {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', price: 7.99 },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Chibi Canvas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Profile">Profile</Nav.Link>
              <Nav.Link href="/Contact">Contact</Nav.Link>
              <Nav.Link href="/ShoppingCart">
                <ShoppingCartIcon />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BigDiver>
        <Container>
          <h1>Your Cart</h1>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </CartItem>
          ))}
          <p>Total: ${total.toFixed(2)}</p>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </Container>
      </BigDiver>
    </>
  );
}

export default CartPage;
