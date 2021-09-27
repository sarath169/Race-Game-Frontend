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

 // Axios Instance
 const axiosInstance = axios.create({
  baseURL : 'http://127.0.0.1:8000/auth/'
})

export default function NavBar() {

  const { user, token, userID, setToken } = useContext(UserContext);
  
  const history = useHistory()
  const Home = () => {
    history.push('/home')
  }
  const Login = () =>{
    history.push('/')
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          { token ? (
            
            <Button color="inherit" onClick = {Logout}>Logout</Button>
            
           ) : <Button color="inherit" onClick = {Login}>Login</Button>}
           
          </Typography>

          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}