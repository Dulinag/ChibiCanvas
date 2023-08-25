import React from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

const ArtworkCard = ({
  card,
  index,
  editingIndex,
  editedImage,
  editedTitle,
  editedSubheader,
  editedPrice,
  editedContent,
  handleToggleEdit,
  handleSaveCard,
  handleRemoveCard,
  setEditedImage,
  setEditedTitle,
  setEditedSubheader,
  setEditedPrice,
  setEditedContent,
}) => {
  if (!card) {
    return <div>Card data is missing</div>;
  }

  return (
    <Card key={index} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {/* Use appropriate icon or avatar */}
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
        <IconButton aria-label="remove" onClick={() => handleRemoveCard(index)}>
          <DeleteIcon />
        </IconButton>

        {/* Show the Edit button only if not in edit mode */}
        {!editingIndex && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleToggleEdit(index)}
          >
            Edit
          </Button>
        )}

        {editingIndex === index && (
          <IconButton
            aria-label="show more"
            onClick={() => handleSaveCard(index)}
          >
            <SaveIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ArtworkCard;