import React, { useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@material-ui/core/styles";


 // Axios Instance
 const axiosInstance = axios.create({
  baseURL : 'http://127.0.0.1:8000/auth/'
})

export default function NavBar() {

  const { user, token, userID, setToken } = useContext(UserContext);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "inline-grid",
    },
    media: {
      height: 200,
    },
    title: {
      height: 80,
    },
    topPadding: {
      padding: "10px",
    },
    leftPadding: {
      leftPadding: "20px",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    red: {
      backgroundColor: "red",
    },
    green: {
      backgroundColor: "lightGreen",
    },
    blue : {
      backgroundColor: "#4FC3F7",
    },
    scrol: {
      margin: "4px",
      padding: "4px",
      backgroundColor: "green",
      width: "500px",
      height: "500px",
      overflowX: "hidden",
      overflowY: "scroll",
      textAlign: "justify",
    },
  }));

  const classes = useStyles();

  
  const history = useHistory()
  const Home = () => {
    history.push('/game')
  }
  const Signup = () => {
    history.push('/signup')
  }
  const Login = () =>{
    history.push('/')
  }
  const Stats = () =>{
    history.push('/stats')
  }
  const Logout = () =>{
    const url = "logout/";
    const formdata = new FormData();
    formdata.append("user", user)
    axiosInstance
      .post(url, formdata)
      .then(function (response) {
        console.log(response.data);
        setToken(null)
        history.push('/')
        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" className = {classes.blue}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            teletyping
            </Typography>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick = {Home}>Home</Button>
          <Button color="inherit" onClick = {Stats}>Stats</Button>
          <Button color="inherit" onClick = {Signup}>Signup</Button>
          { token ? (
            
            <Button color="inherit" onClick = {Logout}>Logout</Button>
            
           ) : <Button color="inherit" onClick = {Login}>Login</Button>}
           
          </Typography>

          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}