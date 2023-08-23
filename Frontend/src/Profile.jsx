import React, { useState } from 'react';
import {Paper, Avatar } from '@mui/material';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled1 from 'styled-components';
import AddIcon from '@mui/icons-material/Add'; // Import the AddIcon component
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save'; // Import the SaveIcon component
import { red } from '@mui/material/colors';
import {

    CardHeader,
    CardMedia,
    IconButton,
    TextField,
  } from '@mui/material';
import image2 from './images/Sanji_and_Zeff_Cooking.webp'

const BigDiver = styled1.div`
  background-color: black;
  padding-bottom: 20%;
  padding-top: 5%;
  color: white;
`;

const Spacer = styled1.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Padder = styled1.div`
 color: black;
 padding-bottom: 25%;
`;

const Spacer1 = styled1.div`
display: flex;
text-align: center;
flex-direction: row;
justify-content: space-evenly;
padding-top: 10px;
flex-wrap: wrap;
overflow-y: scroll;
border: 1px solid black;
height: 600px;
`;


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

function Profile() {

    const [cards, setCards] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedSubheader, setEditedSubheader] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedImage, setEditedImage] = useState('');
    const [editedPrice, setEditedPrice] = useState('');

  
    const handleToggleEdit = (index) => {
      if (editingIndex === index) {
        handleSaveCard(index);
      } else {
        setEditingIndex(index);
        setEditedTitle(cards[index].title);
        setEditedSubheader(cards[index].subheader);
        setEditedContent(cards[index].content);
        setEditedPrice(cards[index].price);
      }
    };
  
    const handleSaveCard = (index) => {
        const updatedCards = [...cards];
        updatedCards[index].title = editedTitle;
        updatedCards[index].subheader = editedSubheader;
        updatedCards[index].price = editedPrice;

        updatedCards[index].content = editedContent;
        updatedCards[index].image = editedImage; // Update the image URL
      
        setCards(updatedCards);
        setEditingIndex(null);
      };
      

    const handleAddCard = () => {
        const newCard = {
          title: "Title",
          subheader: 'Date Made',
          image: 'https://example.com/placeholder-image.jpg', // Use a placeholder image URL here,
          price: '$--',
          content: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests...',
        };
      
        setCards([...cards, newCard]);
      };

  const handleEditCard = (index) => {
    setEditingIndex(index);
  };

 
  return (
    <>    <Navbar expand="lg" className="bg-body-tertiary">
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
  <BigDiver>
    <Container maxWidth="sm">
      <StyledPaper elevation={3}>
        <ProfileAvatar src="/path/to/avatar.png" alt="User Avatar" />
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Your Profile
        </Typography>
        <Typography variant="body1">
Hello        </Typography>
        {/* Display more user information or relevant content */}
      </StyledPaper>
      <Spacer>
        <br></br>
<Card>
        <CardContent>
          <Button
            variant="outlined"
            color="primary"
            href="#scrollToSection"

            startIcon={<AddIcon />}
            onClick={handleAddCard}
          >
            Add Art
          </Button>
        </CardContent>
      </Card>
      </Spacer>
    </Container>
<Padder>h</Padder>
    <Spacer1 id="scrollToSection">
    {cards.map((card, index) => (
  <Card key={index} sx={{ maxWidth: 345 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          R
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={
        editingIndex === index ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          card.title
        )
      }
 
      subheader={
        editingIndex === index ? (
          <TextField
            value={editedSubheader}
            onChange={(e) => setEditedSubheader(e.target.value)}
          />
        ) : (
          card.subheader
        )
      }
    />
    <CardMedia
      component="img"
      height="194"
      image={editingIndex === index ? editedImage : card.image}
      alt={card.title}
    />
    {editingIndex === index && (
      <input
        type="text"
        placeholder="Enter Image URL"
        value={editedImage}
        onChange={(e) => setEditedImage(e.target.value)}
      />
    )}
    <CardContent>
    <Typography variant="body2" color="text.secondary">
        {editingIndex === index ? (
          <TextField
            multiline
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
          />
        ) : (
          card.price
        )}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {editingIndex === index ? (
          <TextField
            multiline
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          card.content
        )}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <IconButton aria-label="Add to cart" href="/ShoppingCart">
        {/* Add your cart icon */}
      </IconButton>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleToggleEdit(index)}
      >
        {editingIndex === index ? 'Save' : 'Edit'}
      </Button>
      {editingIndex === index && (
        <IconButton aria-label="show more" onClick={() => handleSaveCard(index)}>
          <SaveIcon />
        </IconButton>
      )}
    </CardActions>
  </Card>
))}





</Spacer1>



    </BigDiver>
    
    </>
  );
}

export default Profile;
