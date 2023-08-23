import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography, Box } from "@mui/material";
import { Container, Nav, Navbar } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



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
   color: white;
  background-color: black;
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
        //
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

            <Nav.Link href="/ShoppingCart">          <ShoppingCartIcon /> </Nav.Link>

          
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


<ContactContainer>
   
<Box
      sx={{
        height: '150vh',
        color: 'white',
        maxWidth: '1000px', // Increase the max width of the component
        margin: '0 auto', 
        
      }}
    >
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
        <Typography variant="h4" align="center" mb={2}>
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
                color: 'white', // Set the font color to white
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white', // Set the label color to white
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
                color: 'white', // Set the font color to white
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white', // Set the label color to white
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
                color: 'white', // Set the font color to white
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white', // Set the label color to white
              },
            }}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
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
  
