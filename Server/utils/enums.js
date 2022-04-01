const ContestStates = Object.freeze({
  UPLOADING: "uploading",
  VOTING: "voting",
  SHOW_WINNERS: "showWinners",
});

const isContestStateValid = (state) => {
  const lowerCaseState = state.toLowerCase();
  return Object.entries(ContestStates)
    .map(([key, val]) => val)
    .includes(lowerCaseState);
};

module.exports = { ContestStates, isContestStateValid };
