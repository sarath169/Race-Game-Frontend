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
  const { user, token, userID } = useContext(UserContext);
  const history = useHistory();
  const [words, setWords] = useState([]);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [wrong, setWrong] = useState(0);
  const [correct, setCorrect] = useState(0)
  const [multiplier, setMultiplier] = useState(1);
  const [pointer, setPointer] = useState(1);
  const [wordTyped, setWordTyped] = useState("Input");
  const [displayWord, setDisplayWord] = useState();
  const [modalStyle] = useState(getModalStyle);
  const [streak, setStreak] = useState(multiplier);
  const [open, setOpen] = useState(false);

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

  const dict = () => {
    return (
      <>
        {console.log(words)}
        <ul>
          {words.length &&
            words.map((word) => {
              <li> {word}</li>;
            })}
        </ul>
      </>
    );
  };

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

  function check() {
    if (pointer < 25) {
      if (wordTyped === displayWord) {
        setDisplayWord(words[pointer]);
        setScore(score + multiplier * 1);
        setMultiplier(multiplier + 1);
        setPointer(pointer + 1);
        setCorrect(correct+1)
      } else {
        setScore(score - 1);
        setWrong(wrong+1)
        setMultiplier(1);
      }
    } else {
      endgame();
    }
  }

  const handleClose = () => {
    setOpen(false);
    // history.push("/game");
  };

  function endgame() {
    setOpen(true);
  }

  const Save = () => {
    const formdata = new FormData();
    formdata.append("user", userID);
    formdata.append("score", score);
    formdata.append("level", level);
    formdata.append("correct", correct );
    formdata.append("wrong", wrong);
    formdata.append("streak", streak);

    const url = "http://127.0.0.1:8000/api/save/";
    axios
      .post(url, formdata)
      .then(function (response) {
        console.log(response);
        history.push("/home");
        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
    setWordTyped(null);
    check();
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
        setDisplayWord(response.data.words[0]);
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
        setLeaderBoard(response.data);
        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setLevel(Math.ceil((10 * score) / 1275));
  }, [score]);
  useEffect(() => {
    if (multiplier > streak) setStreak(multiplier);
  }, [multiplier]);
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
                      <TableCell align="right"></TableCell>
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
            {/* <Box>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ul>
                {words.length &&
                  words.map((word) => (
                    <li> {word}</li>
                  ))}
              </ul>
            </Grid>
          </Grid>
        </Box> */}
          </Grid>
        </Box>
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
          value={wordTyped}
          onChange={inputChangeHandler}
        />
      </Box>
      <div>
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
                <li> Streak : {streak}</li>
                <li> Correct : {correct}</li>
                <li> Wrong : {wrong}</li>
              </ul>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Don't Save
              </Button>
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
      </div>
    </div>
  );
}

export default Game;
