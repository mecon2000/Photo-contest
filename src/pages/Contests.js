import React, { useState, useEffect } from "react";
import { getContests, addContest, updateContest, deleteContest } from "../services/contestService";
import { MultiToggler } from "../components/MultiToggler";
import removeImg from "../images/remove.png";
import uploadImg from "../images/upload.png";

export function Contests() {
  const [contests, setContests] = useState([]);
  const userId = 1;
  const stateList = ["uploading", "voting", "show winners"];
  //TODO use ContestStates (which should be moved to a place accessible by client and server)

  useEffect(() => {
    const getAllContests = async () => {
      const c = await getContests({ userId });
      setContests(c);
    };
    getAllContests();
  }, []);

  // useEffect; //getcontests
  // useEffect; //addContest
  //gotoContest

  const gotoContest = (contestId) => {
    console.log(`go to ${contestId}`);
  };

  const handleDeletion = (contestName, contestId) => {
    if (window.confirm(`Are you sure you want to delete the contes \"${contestName}\"`))
      deleteContest({ userId, contestId });
  };

  return (
    <div className="page-wrapper">
      <div className="contests-container">
        {contests.map((c, i) => {
          return (
            <div className="contest" key={"contest" + i}>
              <div className="contest-name">{c.name}</div>
              <MultiToggler
                initialState={c.state}
                states={stateList}
                onClick={(newState) => updateContest({ userId, contestId: c._id, newState })}
              />
              <img
                className="contest-button"
                src={removeImg}
                alt="delete contest"
                onClick={(e) => handleDeletion(c.name, c._id)}
              />
              <img className="contest-button" src={uploadImg} alt="goto contest" onClick={(e) => gotoContest(c._id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
