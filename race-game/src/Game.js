import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import { Modal } from "@material-ui/core";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";
import { lightGreen, red } from "@mui/material/colors";

import "./App.css";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

function Game() {
  const { user, token, userID } = useContext(UserContext);
  const history = useHistory();
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [wrong, setWrong] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [stack, setStack] = useState(0);
  const [index, setIndex] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [pointer, setPointer] = useState(1);
  const [wordTyped, setWordTyped] = useState("");
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
    red: {
      backgroundColor: red,
    },
    green: {
      backgroundColor: lightGreen,
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
          color={displayWord == wordTyped ? classes.green : classes.red}
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

  async function populateStack() {
    if (stack < 10) {
      setTimeout(setStack(stack + 1), 3000);
      console.log(stack);
      // sleep(10000);
      setIndex(index + 1);
    } else {
      endgame();
    }
  }

  function check() {
    if (pointer < 25) {
      if (wordTyped === displayWord) {
        setDisplayWord(words[pointer]);
        setScore(score + multiplier * 1);
        setMultiplier(multiplier + 1);
        setPointer(pointer + 1);
        setIndex(index + 1);
        setCorrect(correct + 1);
      } else {
        if (score) {
          setScore(score - 1);
        }
        setWrong(wrong + 1);
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

  const save = () => {
    const formdata = new FormData();
    formdata.append("user", userID);
    formdata.append("score", score);
    formdata.append("level", level);
    formdata.append("correct", correct);
    formdata.append("wrong", wrong);
    formdata.append("streak", streak);

    axiosInstance
      .post("save/", formdata)
      .then(function (response) {
        console.log(response);
        history.push("/home");
        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const stop = () => {
    setOpen(true);
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
    setWordTyped('');
    check();
  };

  const inputChangeHandler = (event) => {
    setWordTyped(event.target.value.toLowerCase());
  };

  // getwords api
  useEffect(() => {
    const url = "getwords/";
    axiosInstance
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

  // Score
  useEffect(() => {
    setLevel(Math.ceil((10 * (score+1)) / 1275));
  }, [score]);

  // multiplier
  useEffect(() => {
    if (multiplier > streak) setStreak(multiplier);
  }, [multiplier]);
  return (
    <div className="App">
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
        <Grid container spacing={3}>
          <Grid item xs={6}>
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
                id="input"
                label="Input"
                name="input"
                autoComplete="fname"
                autoFocus
                value={wordTyped}
                onChange={inputChangeHandler}
              />
            </Box>
          </Grid>
          <Button
            onClick={() => {
              stop();
            }}
          >
            Stop
          </Button>
        </Grid>
      </Box>
      {/* <Button
        onClick={() => {
          testWord();
        }}
      >
        Start
      </Button> */}

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
              {user ? (
                <>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Don't Save
                  </Button>
                  <Button
                    onClick={() => {
                      save();
                    }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Exit
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      history.push("/signup");
                    }}
                  >
                    Create an account to save
                  </Button>
                </>
              )}
            </div>
          </>
        </Modal>
        {/* <Button
                onClick={() => {
                  Save();
                }}
              >
                Start
              </Button> */}
      </div>
    </div>
  );
}

export default Game;
