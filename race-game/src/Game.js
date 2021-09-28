import React, { useState, useEffect, useContext } from "react";
import randomWords from "random-words";
import Card from "@mui/material/Card";
import { Modal } from "@material-ui/core";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";
import { green, lightGreen, red } from "@mui/material/colors";

import "./App.css";
import WordCheck from "./Components/WordCheck";
import WordStack from "./Components/WordStack";
import { Hidden } from "@mui/material";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const NUMB_OF_WORDS = 200;
const SECONDS = 60;

function Game() {
  const { user, token, userID } = useContext(UserContext);
  const history = useHistory();
  const [playAgain, setPlayAgain] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [intervalID, setIntervalID] = useState(null);
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [wrong, setWrong] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [length, setLength] = useState(1);
  const [stackWord, setStackWord] = useState("");
  const [stack, setStack] = useState([]);
  const [index, setIndex] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [pointer, setPointer] = useState(0);
  const [wordTyped, setWordTyped] = useState("");
  const [displayWord, setDisplayWord] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const [streak, setStreak] = useState(multiplier);
  const [open, setOpen] = useState(false);
  const [keyPress, setKeyPress] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

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
    scrol: {
      margin: "4px",
      padding: "4px",
      backgroundColor: green,
      width: "500px",
      height: "500px",
      overflowX: "hidden",
      overflowY: "scroll",
      textAlign: "justify",
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

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill();
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
  const startgame = () => {
    let id;
    setReadOnly(false);
    if (words.length > 0) {
      id = setInterval(() => {
        setStack((prevStack) => [...prevStack, words[0]]);
        words.shift();
        console.log(level, "level");
      }, 5000 / level);
      setIntervalID(id);
    }
  };

  function endgame() {
    console.log("endgame");
    clearInterval(intervalID);
    stop();
  }

  function check() {
    if (stack.length < 10) {
      if (wordTyped === displayWord) {
        if (wordTyped === stack[0]) {
          stack.shift();
        }
        if (stack.length > 0) {
          console.log("stack is not null");
          setDisplayWord(stack[0]);
        } else {
          console.log("stack is null");
          setDisplayWord(words[0]);
          words.shift();
        }
        setScore(score + multiplier * 1);
        setMultiplier(multiplier + 1);
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
        history.push("/leaderboard");
        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const stop = () => {
    console.log("stop");
    setOpen(true);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setWordTyped("");
    check();
  };

  const inputChangeHandler = (event) => {
    setWordTyped(event.target.value.toLowerCase());
  };

  const downHandler = (event) => {
    console.log("keydown");
    setKeyPress(...keyPress, event.key);
  };

  // generate words
  useEffect(() => {
    setWords(randomWords({ exactly: NUMB_OF_WORDS, minLength: 4 }));
    clearInterval(intervalID);
    setStack([]);
  }, [playAgain]);

  // set stack words as words[0]
  useEffect(() => {
    setStackWord(words[0]);
  }, [words]);

  useEffect(() => {
    setDisplayWord(stackWord);
  }, [stackWord]);

  useEffect(() => {
    console.log(stack);
    if (stack.length > 10) {
      console.log("endgame");
      endgame();
    }
  }, [stack]);

  //Level

  useEffect(() => {
    if (intervalID){
    clearInterval(intervalID)
    startgame()
    }
  },[level])

  // Score
  useEffect(() => {
    setLevel(Math.ceil((10 * (score + 1)) / 1100));
  }, [score]);

  // multiplier
  useEffect(() => {
    if (multiplier > streak) setStreak(multiplier);
  }, [multiplier]);

  return (
    <div className="App">
      <div className="">
        {/* <div className={classes.scrol}>
          <ul>
            {words.length &&
              words.map((word, index) => {
                return (
                  <li>
                    <span key={index}>{word}</span>
                  </li>
                );
              })}
          </ul>
        </div> */}
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
      <br />
      <br />
      <WordStack stack={stack} />
      {displayWord && <WordCheck word={displayWord} userInput={wordTyped} />}
      <Box>
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
                InputProps={{
                  readOnly: readOnly,
                }}
                value={wordTyped}
                // onKeyDown={inputChangeHandler}
                onChange={inputChangeHandler}
              />
            </Box>
          </Grid>
        </Grid>
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
                      setMultiplier(1);
                      setScore(0);
                      setLevel(1);
                      setPlayAgain(true);
                    }}
                  >
                    Play Again
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
        <Button
          onClick={() => {
            startgame();
          }}
        >
          Start
        </Button>
        <Button
          onClick={() => {
            stop();
          }}
        >
          Stop
        </Button>
      </div>
    </div>
  );
}

export default Game;
