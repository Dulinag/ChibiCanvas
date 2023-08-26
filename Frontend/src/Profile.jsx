import React, { useState, useEffect } from "react";
import { Paper, Avatar } from "@mui/material";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled1 from "styled-components";
import AddIcon from "@mui/icons-material/Add"; // Import the AddIcon component
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save"; // Import the SaveIcon component
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import image3 from "./images/edit.png";

import { CardHeader, CardMedia, IconButton, TextField } from "@mui/material";

import image2 from "./images/Sanji_and_Zeff_Cooking.webp";
import ProfileArtworks from "./ProfileArtworks";
import axios from "axios";
import ArtworkCard from "./ArtworkCard";

const BigDiver = styled1.div`
  background-color: white;
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

const ScrollToTopButton = styled1.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: gray;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%; /* Make it circular */
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &.active {
    transform: scale(1.1);
  }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

function Profile() {
  const [artworks, setArtworks] = useState([]);
  const [subTotal, setsubTotal] = useState(0);

  // useEffect(()=>
  // {
  //   let total=0;
  //   console.log("artworks are " + JSON.stringify(artworks));
  //   for(let i=0;i<artworks.length;i++)
  //   {
  //     total += parseFloat(artworks[i].price);
  //   }
  //   setsubTotal(total);
  // }, [artworks]);
  function getartworks() {
    axios
      .get("http://localhost:3001/getArtworksByUser", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log("Responses are " + JSON.stringify(response.data));
        setArtworks(response.data);

        console.log(
          "we just set artworks and they are now " + JSON.stringify(artworks)
        );
        // window.location.reload(false);
      })
      .catch((err) => {
        if (err) {
          console.log("error" + err);
        }
      });
  }

  const [cards, setCards] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedSubheader, setEditedSubheader] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

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

  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleRemoveCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    const newCard = {
      title: "Title",
      subheader: "Date Made",
      image: image3, // Use a placeholder image URL here,
      price: "$--",
      content:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests...",
    };

    setCards([...cards, newCard]);
  };

  const handleEditCard = (index) => {
    setEditingIndex(index);
  };
  useEffect(() => {
    let ignore = false;

    if (!ignore) getartworks();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {" "}
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
      <BigDiver>
        <Container maxWidth="sm">
          <StyledPaper elevation={3}>
            <ProfileAvatar src="/path/to/avatar.png" alt="User Avatar" />
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Your Profile, {localStorage.getItem("username")}
            </Typography>
            <Typography variant="body1">Hello </Typography>
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
                <Button
                  variant="outlined"
                  color="primary"
                  href="#scrollToSection"
                  startIcon={<AddIcon />}
                  onClick={getartworks}
                >
                  Load art
                </Button>
              </CardContent>
            </Card>
          </Spacer>
        </Container>

        {/* <Padder>h</Padder> */}

        <br></br>
        <ul className="flexcontainer">
          <ArtworkCard
            title="Paella"
            price="$50"
            date="Aug 2023"
            imgURL="https://st2.depositphotos.com/1868949/8012/i/450/depositphotos_80126386-stock-photo-spanish-paella-with-seafood.jpg"
            description="This is an impressive paella"
          />
          {artworks
            ? artworks.map((data, index) => {
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
      </BigDiver>
    </>
  );
}

export default Profile;
