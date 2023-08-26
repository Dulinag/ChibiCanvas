import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const TrueColor = styled.div`
  
color: white;
text-align center;

padding: 10px;

`;

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 150vh;
  overflow: hidden;
  color: black;
  background-color: white;
`;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your form submission logic here

    // After submission, clear the form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <div className="app2">
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
                  {" "}
                  <ShoppingCartIcon />{" "}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <ContactContainer>
          <Box
            sx={{
              height: "150vh",
              color: "black",
              maxWidth: "1000px", // Increase the max width of the component
              margin: "0 auto",
            }}
          >
            <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
              <Typography
                variant="h4"
                align="center"
                mb={2}
                style={{ color: "white" }}
              >
                Contact Us
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required
                  InputProps={{
                    style: {
                      color: "black", // Set the font color to white
                      backgroundColor: "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black", // Set the label color to white
                      backgroundColor: "white",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                  type="email"
                  InputProps={{
                    style: {
                      color: "black", // Set the font color to white
                      backgroundColor: "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black", // Set the label color to white
                      backgroundColor: "white",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  margin="normal"
                  required
                  multiline
                  rows={4}
                  InputProps={{
                    style: {
                      color: "black", // Set the font color to white
                      backgroundColor: "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black", // Set the label color to white
                      backgroundColor: "white",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: 2,
                    color: "black", // Set button text color to black
                    backgroundColor: "white", // Set button background color to white
                  }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Box>
        </ContactContainer>
      </div>
    </>
  );
}
