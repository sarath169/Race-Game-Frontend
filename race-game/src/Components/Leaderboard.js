import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

function Leaderboard() {
  const [leaderBoard, setLeaderBoard] = useState([]);
  useEffect(() => {
    const url = "leaderboard/";
    axiosInstance
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
  return (
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
                        <TableCell align="right">
                          {Math.floor(row.score)}
                        </TableCell>
                        <TableCell align="right">{row.streak}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Leaderboard;
