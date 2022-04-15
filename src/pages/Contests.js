import React, { useState } from "react";
import { MultiToggler } from "../components/MultiToggler";
import removeImg from "../images/remove.png";
import uploadImg from "../images/upload.png";

export function Contests() {
  const [contests, setContests] = useState([
    { name: "black&white", id: "1", state: "voting" },
    { name: "contesttt 2", id: "2", state: "uploading" },
    { name: "IDK MAN", id: "3", state: "show winners" },
  ]);
  // useEffect; //getcontests
  // useEffect; //updateContest
  // useEffect; //addContest
  // useEffect; //deleteContest
  //gotoContest

  const deleteContest = (contestId) => {
    console.log(`delete ${contestId}`);
  };

  const gotoContest = (contestId) => {
    console.log(`go to ${contestId}`);
  };

  return (
    <div className="page-wrapper">
      <div className="contests-container">
        {contests.map((c, i) => {
          return (
            <div className="contest" key={"contest" + i}>
              <div className="contest-name">{c.name}</div>
              <MultiToggler initialState={c.state} states={["uploading", "voting", "show winners"]} />
              <img className="contest-button" src={removeImg} alt="delete contest" onClick={(e) => deleteContest(c.id)} />
              <img className="contest-button" src={uploadImg} alt="goto contest" onClick={(e) => gotoContest(c.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
