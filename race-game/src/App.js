import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Game from "./Game";
import Home from "./Home";
import ChangePassword from "./ChangePassword.js";
import { UserProvider } from "./UserContext";
import NavBar from "./NavBar";
import "./App.css";

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
    <div>
      <BrowserRouter>
        <UserProvider value={providerValue}>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/changepassword">
              <ChangePassword />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/game">
              <Game />
            </Route>

            {/* <Route exact path="/search">
            <Input />
          </Route>
          <Route path="/favourites">
            <Favourites />
          </Route>
          <Route path="/addlocation">
            <AddLocation />
          </Route>
          <Route path="/searchlocation">
            <LocationSearch />
          </Route>
          <Route path="/result">
            <Display />
          </Route> */}
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
