import React from "react";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

function WordCheck(props) {
  const word = props.word.split("");
  const userInput = props.userInput.split("");

  console.log(userInput, "wordcheck")

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

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Card variant="outlined">
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
                  gutterBottom
                  textAlign="center"
                >
                  <div>
                    {word.map((symbol, index) => {
                      let color;
                      if (index < props.userInput.length) {
                        color =
                          symbol === userInput[index]? "#00FF00" : "#FF0000";
                      }
                      return (
                        <span key={index} style={{ backgroundColor: color }}>
                          {symbol}
                        </span>
                      );
                    })}
                  </div>
                </Typography>
              </CardContent>
            </React.Fragment>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WordCheck;
