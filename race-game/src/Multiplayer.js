import React, { useState, useEffect, useContext } from "react";
import randomWords from "random-words";
import Keyboard from "react-virtual-keyboard";
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

import "./Game.css";

import WordCheck from "./Components/WordCheck";
import WordStack from "./Components/WordStack";
import ChartBar from "./Components/ProgressiveBar/Chart/ChartBar";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const NUMB_OF_WORDS = 200;
const SECONDS = 60;

function Multiplayer() {
  const { user, token, userID } = useContext(UserContext);
  console.log(user, userID);
  const history = useHistory();
  const [playAgain, setPlayAgain] = useState(false);
  const [instruction, setInstruction] = useState(false);
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [intervalID, setIntervalID] = useState(null);
  const [input, setInput] = useState();
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [wrong, setWrong] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [stackWord, setStackWord] = useState("");
  const [stack, setStack] = useState([]);
  const [index, setIndex] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [wordTyped, setWordTyped] = useState("");
  const [displayWord, setDisplayWord] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const [streak, setStreak] = useState(multiplier);
  const [keyPress, setKeyPress] = useState("");

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
    rightMargin: {},
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
      setPlayAgain(false);
    }
  };

  function endgame() {
    console.log("endgame");
    clearInterval(intervalID);
    setStarted(false);
    setFinished(true);
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
    setInstruction(false);
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

  // generate words
  useEffect(() => {
    setWords(randomWords({ exactly: NUMB_OF_WORDS, minLength: 4 }));
  }, []);

  // PlayAgain
  useEffect(() => {
    if (playAgain) {
      setWords(randomWords({ exactly: NUMB_OF_WORDS, minLength: 4 }));
      clearInterval(intervalID);
      setStack([]);
    }
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
    if (stack.length > 9) {
      console.log("endgame");
      endgame();
    }
  }, [stack]);

  //Level

  useEffect(() => {
    if (intervalID) {
      clearInterval(intervalID);
      startgame();
    }
  }, [level]);

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
            <Grid item xs={8}>
              <WordStack stack={stack} />
            </Grid>

            <Grid item xs={0}>
              <ChartBar
                value={stack.length}
                maxValue={10}
                label="Stack Meter"
              />
            </Grid>
            <Grid item xs={0}>
              <Grid item xs={0}>
                <Card variant="outlined">{scoreCard}</Card>
              </Grid>
              <Grid item xs={0}>
                <Card variant="outlined">{levelCard}</Card>
              </Grid>
              <Grid item xs={0}>
                <Card variant="outlined">{multiplierCard}</Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
      <br />
      <br />
      {displayWord && <WordCheck word={displayWord} userInput={wordTyped} />}
      <br />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={8}>
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
          open={instruction}
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
                Ok
              </Button>
            </div>
          </>
        </Modal>
      </div>

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
                    Play Again
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
        variant = "outlined"
          disabled={started}
          onClick={() => {
            startgame();
            setInstruction(true);
            setStarted(true);
          }}
        >
          Start
        </Button>
        <br/>
        <br/>
      </div>
      {/* <Keyboard
        value={input}
        name="keyboard"
        options={{
          type: "input",
          layout: "qwerty",
          alwaysOpen: true,
          usePreview: false,
          useWheel: false,
          stickyShift: false,
          appendLocally: true,
          color: "light",
          updateOnChange: true,
          initialFocus: true,
          display: {
            accept: "Submit",
          },
        }}
        onChange={onInputChanged}
        onAccepted={onInputSubmitted}
        // ref={}
        callbackParent={(k) => {
          this.keyboard = k;
        }}
      /> */}
    </div>
  );
}

export default Multiplayer;
