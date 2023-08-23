import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled1 from 'styled-components';
import image1 from './images/Sanji_and_Zeff_Cooking.webp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import {useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'; 


import 'bootstrap/dist/css/bootstrap.css';




const CheckoutButton = styled1.button`
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






const Centerpage = styled1.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BigDiver = styled1.div`
  background-color: black;
  padding-bottom: 30%;
  color: white;
`;


const Titler = styled1.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1%;  
  padding-bottom: 1%;  

`;

const LoginSpace = styled1.div`
text-align: center;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
  
`;


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Home() {

  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isValidationError, setIsValidationError] = useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const handleCreateAccountClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCreateAccount = () => {
    // Basic email and password validation
    if (email && password && password.length >= 6) {
      // Simulate account creation with a success message
      alert('Account created successfully!');
      setIsValidationError(false);
      setIsDialogOpen(false);
      navigate('/Profile');
    } else {
      setIsValidationError(true);
    }
  };
  const handleLoginClick = () => {
    setIsLoginDialogOpen(true);
  };


  const handleProfileClick = () => {
if(setIsValidationError(false) && setIsLoginDialogOpen(false)){
  navigate('/Profile');

}

  };
  const handleLoginDialogClose = () => {
    setIsLoginDialogOpen(false);
  };
  const handleLogin = () => {
    // Basic login validation logic
    if (email && password) {
      // Simulate successful login
      alert('Logged in successfully!');
      setIsValidationError(false);
      setIsLoginDialogOpen(false);
      navigate('/Profile');
        } else {
      setIsValidationError(true);
    }
  };


const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

  return (


<>
    <div className="App">
      <BigDiver>

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

<Titler>

    <a onClick = {handleProfileClick}>
    <ProfileAvatar src="/path/to/avatar.png" alt="User Avatar" />
</a>


  </Titler>

<LoginSpace >

<CheckoutButton onClick={handleLoginClick}>   
            Log In
</CheckoutButton>


          <CheckoutButton onClick={handleCreateAccountClick}>
            Create Account
          </CheckoutButton>


          <Dialog open={isLoginDialogOpen} onClose={handleLoginDialogClose}>
            <DialogTitle>Log In</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your email and password to log in.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={isValidationError}
                helperText={isValidationError && 'Please enter a valid email'}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={isValidationError && password.length === 0}
                helperText={isValidationError && password.length === 0 && 'Please enter your password'}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLoginDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleLogin} color="primary">
                Log In
              </Button>
            </DialogActions>
          </Dialog>
        
          </LoginSpace>
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Create Account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your email and password to create an account.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={isValidationError}
                helperText={isValidationError && 'Please enter a valid email'}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={isValidationError && password.length < 6}
                helperText={isValidationError && password.length < 6 && 'Password must be at least 6 characters'}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCreateAccount} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        
     
  <Card sx={{ maxWidth: 345 }}>
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
        title="Sanji's Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={image1}
        alt="Sanji's Paella"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
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
          <ShoppingCartIcon />
        </IconButton>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>$5000</Typography>
          <Typography paragraph>
          </Typography>
          <Typography paragraph>
            Sanji/s tasy Paella
          </Typography>
      
      
        </CardContent>
      </Collapse>
    </Card>
    </BigDiver>
    </div>
    </>
  );
}

export default Home;
