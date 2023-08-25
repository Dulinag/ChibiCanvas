import React from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NormalCard = ({ card }) => {
  if (!card) {
    return <div>Card data is missing</div>;
  }

  return (
    <Card style={{ maxWidth: 345, width: '100%' }}> {/* Adjust the maxWidth value and width as needed */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {/* Use appropriate icon or avatar */}
          </Avatar>
        }
        title={card.title}
        subheader={card.subheader}
      />
      <CardMedia
        component="img"
        height="194"
        image={card.image}
        alt={card.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {card.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NormalCard;
