const { ValidationException, throwIfValidationFailed } = require("../utils/validationsHelper");
const { ContestStates, isContestStateValid } = require("../utils/enums");
const {
  addNewContest,
  updateContestState,
  getAllContests,
  isContestNameExists,
  isContestIdExists,
} = require("../models/contest");
const { isUserAdmin } = require("../models/user");
const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();

//   POST /v1/contest (body must contain: userId, name (of contest))
//   will create a new contest and put it in state of "uploading".
//   return error if userId is not admin
//   return error if Name already exists
router.post("/v1/contest", jsonParser, async (req, res) => {
  try {
    const userId = req?.body?.userId;
    const contestName = req?.body?.name;

    throwIfValidationFailed(userId && contestName, 400, "missing Parameters");
    throwIfValidationFailed(isUserAdmin(userId), 401, "User is not admin!");
    throwIfValidationFailed(!isContestNameExists(contestName), 400, "Contest name already exists");

    const hasSucceeded = await addNewContest(contestName);

    throwIfValidationFailed(hasSucceeded, 500, "adding a contest failed!");

    res.send("POST /v1/contest is successful");
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationException) {
      res.status(e.errCode).send(e.errMessage);
    } else res.status(500).send("failed for unknown reason");
  }
});

//   PUT /v1/contest (body will contain: userId, contestId, newState)
//   updates the state of a contest
//   return error if userId is not admin
//   return error if contestId doesn't exist
router.put("/v1/contest", jsonParser, async (req, res) => {
  try {
    const userId = req?.body?.userId;
    const contestId = req?.body?.contestId;
    const newState = req?.body?.newState;

    throwIfValidationFailed(userId && contestId && newState, 400, "missing Parameters");
    throwIfValidationFailed(isUserAdmin(userId), 401, "User is not admin!");
    throwIfValidationFailed(isContestStateValid(newState), 400, "Contest state isn't valid");
    throwIfValidationFailed(isContestIdExists(contestId), 400, "Contest Id doesn't exist");

    const hasSucceeded = await updateContestState(contestId, newState);

    throwIfValidationFailed(hasSucceeded, 500, "update failed!");

    res.send("PUT /v1/contest is successful");
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationException) {
      res.status(e.errCode).send(e.errMessage);
    } else res.status(500).send("failed for unknown reason");
  }
});

//   GET /v1/contest (body will contain: userId)
//   returns a list of contests
//   return error if userId is not admin
router.get("/v1/contest", jsonParser, async (req, res) => {
  try {
    const userId = req?.body?.userId;

    throwIfValidationFailed(userId, 400, "missing Parameters");
    throwIfValidationFailed(isUserAdmin(userId), 401, "User is not admin!");

    const contests = await getAllContests();

    res.send(contests);
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationException) {
      res.status(e.errCode).send(e.errMessage);
    } else res.status(500).send("failed for unknown reason");
  }
});

module.exports = router;
