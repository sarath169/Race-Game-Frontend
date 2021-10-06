import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";
import "./UserStats.css";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

function UserStats() {
  const { user, token, userID } = useContext(UserContext);
  const [userStats, setUserStats] = useState([]);
  const history = useHistory();

  console.log(user, userID);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "inline-grid",
    },
    center: {
      textAlign: "center",
    },
    media: {
      height: 200,
    },
    title: {
      height: 80,
    },
    topPadding: {
      padding: "15px",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  const stats = () => {
    return (
      <Grid item xs={12}>
        <div className={classes.center}>
          <h3>User Stats</h3>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell align="right">Level</TableCell>
                <TableCell align="right">Correct</TableCell>
                <TableCell align="right">Wrong</TableCell>
                <TableCell align="right">Streak</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userStats.length ? (
                userStats.map((row) => (
                  <TableRow
                    key={row.user}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {user}
                    </TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                    <TableCell align="right">{row.level}</TableCell>
                    <TableCell align="right">{row.correct}</TableCell>
                    <TableCell align="right">{row.wrong}</TableCell>
                    <TableCell align="right">{row.streak}</TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  };

  useEffect(() => {
    if (userID) {
      const url = "stats/";
      console.log(userID);
      axiosInstance
        .get(url, {
          params: { user: userID },
        })
        .then(function (response) {
          console.log(response.data);
          setUserStats(response.data);

          // setUsers(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  return (
    <div className={classes.topPadding}>
      <Box>{userStats.length ? stats() : <><h2>Please Login </h2></>}</Box>

      <div>
      {userStats.length ? (<Button
          onClick={() => {
            history.push("/game");
          }}
        >
          Ok
        </Button>) : <><Button
          onClick={() => {
            history.push("/game");
          }}
        >
          Back
        </Button></>}
        
      </div>
    </div>
  );
}

export default UserStats;
