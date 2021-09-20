import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Game from "./Game";
import Home from "./Home";
import { UserProvider } from "./UserContext";
import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const history = useHistory();
  const providerValue = useMemo(
    () => ({ user, setUser, token, setToken, userID, setUserID, }),
    [user, setUser, token, setToken, userID, setUserID]
  );
  return (
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
  );
}

export default App;
