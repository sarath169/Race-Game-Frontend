import React, { useState, useEffect, useContext } from "react";
import { Modal } from "@material-ui/core";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import ReactTable from "react-table";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";

function Home() {
  const { user, token, userID } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const history = useHistory();
  const [modalStyle] = useState(getModalStyle);

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

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const stats = () =>{
    return(<Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {userStats.length}
          <h3>User Stats</h3>
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
                {userStats.length &&
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
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>)
  }
  const handleClose = () => {
    setOpen(false);
    history.push("/game");
  };
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/leaderboard/";
    axios
      .get(url)
      .then(function (response) {
        console.log(response.data);
        setLeaderBoard(response.data);

        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/stats/";
    console.log(userID)
    axios
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
  }, []);
  return (
    <div>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3>LeaderBoard</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">Level</TableCell>
                    <TableCell align="right">Score</TableCell>
                    <TableCell align="right">Streak</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderBoard.length &&
                    leaderBoard.map((row) => (
                      <TableRow
                        key={row.user}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.username}
                        </TableCell>
                        <TableCell align="right">{row.level}</TableCell>
                        <TableCell align="right">{row.score}</TableCell>
                        <TableCell align="right">{row.streak}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      {userStats.length && stats()}
      <div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Start
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <>
            <div style={modalStyle} className={classes.paper}>
              <ul>
                <li>
                  {" "}
                  On screen feedback mechanism for the player to see what key
                  they’ve pressed
                </li>
                <li>
                  {" "}
                  Stack view displaying if they player typed a word correctly or
                  not, and proceeding with removing the word from the stack on
                  correct typing
                </li>
                <li>
                  {" "}
                  Progress view indicating the current score, level (optional)
                  and multiplier
                </li>
                <li>
                  {" "}
                  Interface to display the score once the game is over, saving
                  it (if the player opts for it) in a database
                </li>
                <li>
                  A leaderboard (top ten scores), and brief statistics display
                  for say number of games played, average score, max level
                  reached, etc.
                </li>
              </ul>
              <Button
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </Button>
            </div>
          </>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
