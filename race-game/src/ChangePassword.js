import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

 // Axios Instance
 const axiosInstance = axios.create({
  baseURL : 'http://127.0.0.1:8000/auth/'
})

const theme = createTheme();

function ChangePassword() {
  const [username, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const history = useHistory();

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };
  const newPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };
  const newPassword2ChangeHandler = (event) => {
    setNewPassword2(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const API_URL = "changepassword/";
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("newpassword", newPassword);
      formdata.append("newpassword2", newPassword2);

      axiosInstance
        .post(API_URL, formdata)
        .then(function (response) {
          console.log(response);
          history.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
              <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="fname"
              autoFocus
              onChange={userNameChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="newpassword"
              label="New Password"
              name="newpassword"
              type="password"
              autoComplete="fname"
              autoFocus
              onChange={newPasswordChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newpassword2"
              label="Comfirm Password"
              type="password"
              id="newpassword2"
              autoComplete="current-password"
              onChange={newPassword2ChangeHandler}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default ChangePassword;
