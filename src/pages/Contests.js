import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { getContests, addContest, updateContest, deleteContest } from "../services/contestService";
import { MultiToggler } from "../components/MultiToggler";
import { AddButton } from "../components/AddButton";

import removeImg from "../images/remove.png";
import gotoImg from "../images/goto.png";

export function Contests() {
  const [contests, setContests] = useState([]);
  const userId = 1;
  const stateListText = ["uploading", "voting", "show winners"];
  const stateToServerState = {
    uploading: "uploading",
    voting: "voting",
    "show winners": "show-winners",
  };
  const serverStateToState = {
    uploading: "uploading",
    voting: "voting",
    "show-winners": "show winners",
  };
  //TODO use ContestStates (which should be moved to a place accessible by client and server)

  useEffect(() => {
    const getAllContests = async () => {
      const c = await getContests({ userId });
      setContests(c);
    };
    getAllContests();
  }, []);

  const gotoContest = (contestId) => {
    console.log(`go to ${contestId}`);
  };

  const handleDeletion = async (contestName, contestId) => {
    if (window.confirm(`Are you sure you want to delete the contest "${contestName}"`)) {
      await deleteContest({ userId, contestId });
      const index = contests.findIndex((c) => c._id === contestId);
      setContests((list) => {
        list.splice(index, 1);
        return [...list];
      });
    }
  };

  const handleAddingContest = async (contestName) => {
    await addContest({ userId, contestName });
    let c = await getContests({ userId });
    setContests([...c]);
  };

  const buildLink = (contestId, contestState) => {
    const stateToRoute = {
      uploading: `/upload`,
      voting: `/vote`,
      "show-winners": `/showwinners`,
    };
    const routePath = stateToRoute[contestState] + `?contestId=${contestId}`;
    return routePath;
  };

  return (
    <div className="page-wrapper">
      <div className="contests-container">
        <h1>Contests:</h1>
        {contests.map((c, i) => {
          return (
            <div className="contest" key={"contest" + i}>
              <div className="contest-name">{c.name}</div>
              <MultiToggler
                initialState={serverStateToState[c.state]}
                states={stateListText}
                onClick={(newState) =>
                  updateContest({ userId, contestId: c._id, newState: stateToServerState[newState] })
                }
              />
              <img
                data-tip
                data-for="deleteTip"
                className="contest-button"
                src={removeImg}
                alt="delete contest"
                onClick={(e) => handleDeletion(c.name, c._id)}
              />
              <ReactTooltip id="deleteTip" place="top" effect="solid" delayShow={300}>
                delete contest
              </ReactTooltip>
              <Link to={buildLink(c._id, c.state)}>
                <img
                  data-tip
                  data-for="gotoTip"
                  className="contest-button"
                  src={gotoImg}
                  alt="goto contest"
                  onClick={(e) => gotoContest(c._id)}
                />
              </Link>
              <ReactTooltip id="gotoTip" place="top" effect="solid" delayShow={300}>
                go to the contest
              </ReactTooltip>
            </div>
          );
        })}
        <AddButton
          onAdd={(contestName) => handleAddingContest(contestName)}
          placeholder="name of new contest"
          submitButtonText="Add contest"
        />
      </div>
    </div>
  );
}
