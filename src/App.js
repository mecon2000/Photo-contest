import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Upload } from "./pages/Upload";
import { Vote } from "./pages/Vote";
import { Contests } from "./pages/Contests";
import { ShowWinners } from "./pages/ShowWinners";
import Dropzone from "./dropzone/Dropzone";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/:user/upload" component={Upload} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/contests" component={Contests} />
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/showwinners" component={ShowWinners} />
        <Route exact path="/old-dropzone" component={Dropzone} />
        <Route path="/" component={Upload} />
      </Switch>
    </Router>
  );
}
export default App;
