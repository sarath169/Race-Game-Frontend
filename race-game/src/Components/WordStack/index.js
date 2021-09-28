import React from "react";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

function WordStack(props) {
  const stack = props.stack;

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
    center : {
        textAlign: "center"
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
        <Grid item xs={6} className = {classes.center}>
            <h3> Stack </h3>
          <Card variant="outlined">
            <ul>
              {stack.map((symbol, index) => {
                return (
                  <li>
                    <span key={index}>{symbol}</span>{" "}
                  </li>
                );
              })}
            </ul>
            <br />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WordStack;
