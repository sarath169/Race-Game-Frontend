import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function KeyboardPress() {
  const [keyPressed, setKeyPressed] = useState("");
  function handleA() {
    console.log(" is pressed");
  }
  const keyPressedCard = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          KeyPressed
        </Typography>
        <Typography
          sx={{ fontSize: 30 }}
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          {keyPressed}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  useKey(/^[a-z0-9]+$/i, handleA);
  function useKey(key, cb) {
    const callbackRef = useRef(cb);
    useEffect(() => {
      callbackRef.current = cb;
    });
    useEffect(() => {
      function handle(event) {
        console.log(event.key);
        setKeyPressed(event.key);
        if (event.key === key) {
          callbackRef.current(event);
        }
      }
      document.addEventListener("keypress", handle);
      return () => document.removeEventListener("keypress", handle);
    }, [key]);
  }

  return (
    <div>
      Testing the keyboard event listner
      <Grid  xs={6}>
        <Grid item xs={3}>
          <Card variant="outlined">{keyPressedCard}</Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default KeyboardPress;