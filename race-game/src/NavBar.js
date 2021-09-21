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

export default function NavBar() {

  const { user, token, userID } = useContext(UserContext);
  
  const history = useHistory()
  const Home = () => {
    history.push('/home')
  }
  const Login = () =>{
    history.push('/')
  }
  const Logout = () =>{
    const url = "http://127.0.0.1:8000/auth/logout/";
    const formdata = new FormData();
    formdata.append("token", token)
    axios
      .post(url, formdata)
      .then(function (response) {
        console.log(response.data);

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
            <MenuIcon />
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


// function NavBar() {
//   const {user,setUser, token, setToken } = useContext(UserContext)
//   const history = useHistory()
//   const handleLogout = () => {
//     const API_URL = "http://127.0.0.1:8000/api/logout/"
//     axios
//       .get(API_URL,{headers : {
//         Authorization: "token "+token,
//       },})
//       .then(function (response) {
//         console.log(response);
//         history.push("/");
//         setToken(null)
//         setUser(null)
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
//   return (
//     <div>
//       <nav className="blue">
//         <div className="nav-wrapper container">
//           <Link to="#" className="brand-logo">
//             Logo
//           </Link>
//           <a href="#" data-target="mobile-demo" className="sidenav-trigger">
//             <i className="material-icons">menu</i>
//           </a>
//           <ul className="right hide-on-med-and-down">
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/searchlocation">LocationSearch</Link>
//             </li>
//             <li>
//               <Link to="/favourites">Favourites</Link>
//             </li>
//             <li>
//               <Link to="/addlocation">AddLocation</Link>
//             </li>
//             {token ? <li><button onClick={handleLogout}>Logout</button></li> : <li><Link to="/"></Link></li>}
//           </ul>
//         </div>
//       </nav>

//       <ul className="sidenav" id="mobile-demo">
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/searchlocation">LocationSearch</Link>
//         </li>
//         <li>
//           <Link to="/favourites">Favourites</Link>
//         </li>
//         <li>
//           <Link to="/addlocation">AddLocation</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default NavBar;
