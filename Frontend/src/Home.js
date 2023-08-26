import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Paper } from '@mui/material';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import ArtworkCard from './ArtworkCard';
import { nominalTypeHack } from 'prop-types';
import image from "./images/art.png"

const CheckoutButton = styled1.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  color: #111;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, border-color 0.3s;
  display: flex;
  margin: 10px;
  &:hover {
    background-color: #3b82f6;
    border-color: #3b82f6;
    color: white;
  }
`;

const Centerpage = styled1.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BigDiver = styled1.div`
  background-color: white;
  padding-bottom: 30%;
  color: white;
`;

const Titler = styled1.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 1%;  
  padding-bottom: 1%;  
  left: 0;
`;

const LoginSpace = styled1.div`
text-align: center;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const introStyle = {
  color: "black",
  paddingTop: "70px",
  paddingBottom: "150px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  gap: "100px"
}

const h1Style = {
  fontFamily: "Courier New",
  fontSize: 80,
  width: "600px"
}

const viewArt = {
  fontFamily: "Courier New",
  border: "1px solid #0000EE",
  textDecoration: "none",
  padding: "6px",
  borderRadius: "10px"
}

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
  const [artworks, setArtworks] = useState([]);
  const profileStyle = {
    width: "50px",
    height: "50px",
    margin: "10px"
  }

  function getArtworks() {
    axios
      .get("http://localhost:3001/artworks")
      .then((response) => {
        console.log("Responses are " + JSON.stringify(response.data));
        setArtworks(response.data);
      })
      .catch((err) => {
        if (err) {
          console.log("error" + err);
        }
      });
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const handleCreateAccountClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };






  const handleLoginClick = () => {
    setIsLoginDialogOpen(true);
  };


  const handleProfileClick = () => {
    if (setIsValidationError(false) && setIsLoginDialogOpen(false)) {
      navigate('/Profile');

    }

  };
  const handleLoginDialogClose = () => {
    setIsLoginDialogOpen(false);
  };
  const loginEndpoint = 'http://localhost:3001/login';
  const createAccountEndpoint = 'http://localhost:3001/createAccount';


  const handleLogin = async () => {

    await axios.post("http://localhost:3001/login", { username: email, password: password }).then((response) => {
      if (response.data.accessToken === undefined) {
        localStorage.setItem('accessToken', 'null');
        localStorage.setItem('username', JSON.stringify('Guest'));

      }
      else {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('username', JSON.stringify(email));
        // navigate("/");

      }
      console.log("response is " + JSON.stringify(response.data));
      alert('Logged in successfully!');
      setIsValidationError(false);
      setIsLoginDialogOpen(false);
      navigate("/profile");
    }).catch((err) => {
      if (err) {
        console.log("error" + err);
      }
    });
    console.log('localstorage auth is ' + localStorage.getItem('accessToken'));
    // window.location.reload(false);


  };

  const handleCreateAccount = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log('email:', email); // Check the value of email
    console.log('emailIsValid:', emailRegex.test(email));

    if (email && password && password.length >= 6 && emailRegex.test(email)) {
      try {
        const response = await fetch(createAccountEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password }),
        });

        if (response.ok) {
          // Handle successful response, e.g., show success message or redirect
          alert('Account created successfully!');
          setIsValidationError(false);
          setIsDialogOpen(false);
          navigate('/Profile');
        } else {
          // Handle error response, e.g., show error message
          setIsValidationError(true);
          console.error('Account creation failed:', response.statusText);
        }
      } catch (error) {
        // Handle network errors
        setIsValidationError(true);
        console.error('Account creation failed:', error);
      }
    } else {
      setIsValidationError(true);
    }
  };


  console.log(email);
  console.log(password);

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
  useEffect(() => {
    let ignore = false;

    if (!ignore) getArtworks();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className="App">
        <BigDiver>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container style={{ marginRight: "0px", marginLeft: "291.5px", height: "42px", width: "10000000px" }}>
              <Navbar.Brand href="/">Chibi Canvas</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" style={{ width: "auto" }}>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/Profile">Profile</Nav.Link>
                  <Nav.Link href="/Contact">Contact</Nav.Link>
                  <Nav.Link href="/ShoppingCart">          <ShoppingCartIcon /> </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Titler>
                <LoginSpace>
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
                <a onClick={handleProfileClick}>
                  <ProfileAvatar style={profileStyle} src="/path/to/avatar.png" alt="User Avatar" />
                </a>
              </Titler>

            </Container>
          </Navbar>
          <div style={introStyle}>
            <img style={{ width: "800px" }} src={image} alt="image" />
            <div>
              <h1 style={h1Style}>Witness Greatness</h1>
              <a style={viewArt} href="#art">View our Art</a>
            </div>
          </div>
          <h1 id="art" style={{ color: "black", textAlign: "center", fontFamily: "Courier New", paddingTop: "20px" }}>The Artwork</h1>
          <ul className='flexcontainer' style={{ paddingTop: "60px" }}>
            <ArtworkCard title="Paella" price="$50" date="Aug 2023" imgURL="https://st2.depositphotos.com/1868949/8012/i/450/depositphotos_80126386-stock-photo-spanish-paella-with-seafood.jpg" description="This is an impressive paella" />
            {artworks ? artworks.map((data, index) => {
              return (
                <ArtworkCard
                  imgURL={data.imgurl}
                  title={data.title}
                  price={data.price}
                  key={index}
                  description={data.description}
                />
              );
            }) : null}
          </ul>
        </BigDiver>
      </div >
    </>
  );
}

export default Home;
