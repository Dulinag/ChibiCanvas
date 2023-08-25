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

const ProfileArtworks = ({title, description, price, date, imgURL, index}) => {
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
      const handleEditCard = (index) => {
        setEditingIndex(index);
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
  return (
    <>
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
        title
      }
 
      subheader={
       
          date
        
      }
    />
    <CardMedia
      component="img"
      height="194"
      image={ imgURL}
      alt={title}
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
        <h2>Here</h2>
    <Typography variant="body2" color="text.secondary">
        {editingIndex === index ? (
          <TextField
            multiline
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
          />
        ) : (
            price
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
          description
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
    </>
  )
}

export default ProfileArtworks