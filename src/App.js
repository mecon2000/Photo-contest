import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Upload } from "./pages/Upload";
import { Vote } from "./pages/Vote";
import { ChooseContest } from "./pages/ChooseContest";
import { ShowWinners } from "./pages/ShowWinners";
import Dropzone from "./dropzone/Dropzone";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/choosecontest">
          <ChooseContest />
        </Route>

        <Route exact path="/upload">
          <Upload />
        </Route>

        <Route exact path="/">
          <Upload />
        </Route>

        <Route exact path="/vote">
          <Vote />
        </Route>

        <Route exact path="/showwinners">
          <ShowWinners />
        </Route>

        <Route path="/Old-dropzone">
          <div>
            <p className="title">React Drag and Drop Image Upload</p>
            <div className="content">
              <Dropzone />
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
