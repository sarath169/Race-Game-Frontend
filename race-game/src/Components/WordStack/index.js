import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { List, ListItem } from "@mui/material";

import "./WordStack.css"

function WordStack(props) {
  const stack = props.stack;

  return (
      <Box >
        <div className = "stack" >
        <Grid item xs={10}>
          <h3> Stack </h3>
          {/* <Card variant="outlined"> */}
          <div className="">
            <List>
              {stack.map((symbol, index) => {
                return (
                  <ListItem>
                    <span key={index}>
                      {symbol}
                    </span>
                  </ListItem>
                );
              })}
            </List>
            </div>
            <br />
          {/* </Card> */}
        </Grid>
        </div>
      </Box>
  );
}

export default WordStack;
