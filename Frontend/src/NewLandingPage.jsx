import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "styled-components";
import ArtworkCard from "./ArtworkCard";
import axios from "axios";

const BigDiver = styled.div`
  background-color: white;
  padding-bottom: 40%;
  padding-top: 5%;
  color: black;
`;

const CartItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;

const CheckoutButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  color: #111;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #3b82f6;
    border-color: #3b82f6;
    color: white;
  }
`;

function CartPage() {
  const [Artworks, setArtworks] = useState([]);
  const [subTotal, setsubTotal] = useState(0);
  useEffect(() => {
    let ignore = false;

    if (!ignore) getArtworks();

    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    let total = 0;
    console.log("Artworks are " + JSON.stringify(Artworks));
    for (let i = 0; i < Artworks.length; i++) {
      total += parseFloat(Artworks[i].price);
    }
    setsubTotal(total);
  }, [Artworks]);
  function getArtworks() {
    axios
      .get("http://localhost:3001/cart", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log("Responses are " + JSON.stringify(response.data));
        setArtworks(response.data);

        console.log(
          "we just set artworks and they are now " + JSON.stringify(Artworks)
        );
        // window.location.reload(false);
      })
      .catch((err) => {
        if (err) {
          console.log("error" + err);
        }
      });
  }

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
          {/* {cartItems.map((item) => (
            <CartItem key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </CartItem>
          ))} */}
          {/* <ArtworkCard title="Paella" price="$50" date="Aug 2023" imgURL="https://st2.depositphotos.com/1868949/8012/i/450/depositphotos_80126386-stock-photo-spanish-paella-with-seafood.jpg" description="This is an impressive paella"/> */}
          <ul className="flexcontainer">
            {Artworks
              ? Artworks.map((data, index) => {
                  return (
                    <ArtworkCard
                      imgURL={data.imgurl}
                      title={data.title}
                      price={data.price}
                      key={index}
                      description={data.description}
                      date={data.date_created}
                    />
                  );
                })
              : null}
          </ul>
          <p>Total: ${subTotal}</p>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </Container>
      </BigDiver>
    </>
  );
}

export default CartPage;
