import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Game from "./Game";
import UserStats from "./UserStats";
import ForgotPassword from "./ForgotPassword";
import { UserProvider } from "./UserContext";
import NavBar from "./NavBar";
import "./App.css";
import Leaderboard from "./Components/Leaderboard";
import SendOtp from "./SendOtp";
import ValidateOtp from "./ValidateOtp";
import KeyboardPress from "./KeyboardPress";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const history = useHistory();
  const providerValue = useMemo(
    () => ({ user, setUser, token, setToken, userID, setUserID }),
    [user, setUser, token, setToken, userID, setUserID]
  );
  return (
    <div >
      <BrowserRouter>
        <UserProvider value={providerValue}>
          <NavBar />
          <div className = "">
          <Switch >
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/game">
              <Game />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/sendotp">
              <SendOtp />
            </Route>
            <Route exact path="/validateotp">
              <ValidateOtp />
            </Route>
            <Route exact path="/forgotpassword">
              <ForgotPassword />
            </Route>
            <Route exact path="/stats">
              <UserStats />
            </Route>
            <Route exact path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route exact path="/keyboard">
              <KeyboardPress />
            </Route>
          </Switch>
          </div>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
