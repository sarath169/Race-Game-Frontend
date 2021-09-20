import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import { Modal } from "@material-ui/core";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";

function Game() {
  const { user, token } = useContext(UserContext);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [words, setWords] = useState([]);
  const [open, setOpen] = useState(false);
  const [wordTyped, setWordTyped] = useState("Input");
  const [displayWord, setDisplayWord] = useState();
  const [rows, setRows] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [modalStyle] = useState(getModalStyle);
  const history = useHistory()

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

  const scoreCard = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          Score
        </Typography>
        <Typography
          sx={{ fontSize: 30 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          {score}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const levelCard = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          Level
        </Typography>
        <Typography
          sx={{ fontSize: 30 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          {level}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const multiplierCard = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          Multiplier
        </Typography>
        <Typography
          sx={{ fontSize: 30 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          {multiplier}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const display = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          Word
        </Typography>
        <Typography
          sx={{ fontSize: 30 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          {displayWord}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const inputWord = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          Input Word
        </Typography>
        <Typography
          sx={{ fontSize: 30 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          {wordTyped}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  function changeInput() {
    return <Card variant="outlined">{display}</Card>;
  }

  function check(pointer) {
    if (pointer < words.length) {
      if (wordTyped === displayWord) {
        pointer = pointer + 1;
      }
    } else {
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
      history.push("/game");
    };

    const Save = () =>{
      const formdata = new FormData();
      formdata.append("username", user);
      formdata.append("score", score);
      formdata.append("level", level);
      formdata.append("correct", 50);
      formdata.append("wrong", 0);
      formdata.append("skipped", 0);

      const url = "http://127.0.0.1:8000/api/save/";
    axios
      .post(url, formdata)
      .then(function (response) {
        console.log(response);
        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function endgame() {
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <>
            <div style={modalStyle} className={classes.paper}>
              <ul>
                <li> Score : {score}</li>
                <li> Level-Reached : {level}</li>
              </ul>
              <Button
                onClick={() => {
                  Save();
                }}
              >
                Save
              </Button>
            </div>
          </>
        </Modal>
      );
    }
  }

  function testWord() {
    var length = 0;
    while (length < words.length) {
      setDisplayWord(words[length]);
      console.log(displayWord);
      if (level == 1) {
        sleep(12000);
        length = length + 1;
        console.log(words[length]);
        console.log(length);
        console.log(displayWord);
        console.log(level);
      } else if (level == 2) {
        sleep(10000);
        length = length + 1;
        console.log(level);
      } else if (level == 3) {
        sleep(8000);
        length = length + 1;
        console.log(level);
      } else if (level == 4) {
        sleep(6000);
        length = length + 1;
        console.log(level);
      } else if (level == 5) {
        sleep(4000);
        length = length + 1;
        console.log(level);
      } else if (level == 6) {
        sleep(3000);
        length = length + 1;
        console.log(level);
      }
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  const inputChangeHandler = (event) => {
    setWordTyped(event.target.value);
  };
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/getwords/";
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        setWords(response.data.words);
        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/leaderboard/";
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        setRows(response.data);
        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // useEffect(() => {
  // }, [displayWord]);
  return (
    <div>
      <div className="">
        <br />
        <br />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Card variant="outlined">{scoreCard}</Card>
            </Grid>
            <Grid item xs={2}>
              <Card variant="outlined">{levelCard}</Card>
            </Grid>
            <Grid item xs={2}>
              <Card variant="outlined">{multiplierCard}</Card>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell align="right">Level</TableCell>
                      <TableCell align="right">Score</TableCell>
                      <TableCell align="right">Matches</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length &&
                      rows.map((row) => (
                        <TableRow
                          key={row.user}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.user}
                          </TableCell>
                          <TableCell align="right">{row.level}</TableCell>
                          <TableCell align="right">{row.score}</TableCell>
                          <TableCell align="right">{row.correct}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
        <React.Fragment></React.Fragment>
      </div>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card variant="outlined">{display}</Card>
          </Grid>
        </Grid>
      </Box>
      <br />
      <br />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card variant="outlined">{inputWord}</Card>
          </Grid>
        </Grid>
      </Box>
      {/* <Button
        onClick={() => {
          testWord();
        }}
      >
        Start
      </Button> */}

      <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="input"
          label="Input"
          name="input"
          autoComplete="fname"
          autoFocus
          onChange={inputChangeHandler}
        />
      </Box>
    </div>
  );
}

export default Game;
