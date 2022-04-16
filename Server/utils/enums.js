const ContestStates = Object.freeze({
  UPLOADING: "uploading",
  VOTING: "voting",
  SHOW_WINNERS: "show-winners",
});

const isContestStateValid = (state) => {
  const lowerCaseState = state.toLowerCase();
  return Object.entries(ContestStates)
    .map(([key, val]) => val.toLowerCase())
    .includes(lowerCaseState);
};

module.exports = { ContestStates, isContestStateValid };
