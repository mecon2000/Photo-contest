const {
  ValidationException,
  throwIfValidationFailed,
  throwIfMissingParams,
  logAndSendError,
} = require("../utils/validationsHelper");
const { ContestStates, isContestStateValid } = require("../utils/enums");
const {
  addNewContest,
  updateContestState,
  getAllContests,
  isContestNameExists,
  isContestIdExists,
  deleteContest,
} = require("../models/contest");
const { isUserAdmin } = require("../models/user");
const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();

//   POST /v1/contest (body must contain: userId, contestName (of contest))
//   will create a new contest and put it in state of "uploading".
//   return error if userId is not admin
//   return error if Name already exists
router.post("/v1/contest", jsonParser, async (req, res) => {
  try {
    const userId = req?.body?.userId;
    const contestName = req?.body?.contestName;

    throwIfMissingParams({ userId, contestName });
    throwIfValidationFailed(await isUserAdmin(userId), 401, "User is not admin!");
    const isNameExists = await isContestNameExists(contestName);
    throwIfValidationFailed(!isNameExists, 400, "Contest name already exists");

    const hasSucceeded = await addNewContest(contestName);

    throwIfValidationFailed(hasSucceeded.acknowledged, 500, "adding a contest failed!");

    res.send(hasSucceeded._id);
  } catch (e) {
    logAndSendError(e, res);
  }
});

//   DELETE /v1/contest (body must contain: userId, contestId)
//   will delete an existing contest
//   return error if userId is not admin
//   return error if contestId doesn't exist
router.delete("/v1/contest", jsonParser, async (req, res) => {
  try {
    const userId = req?.body?.userId;
    const contestId = req?.body?.contestId;

    throwIfMissingParams({ userId, contestId });
    throwIfValidationFailed(await isUserAdmin(userId), 401, "User is not admin!");
    throwIfValidationFailed(await isContestIdExists(contestId), 400, "Contest Id doesn't exists");

    const hasSucceeded = await deleteContest(contestId);

    throwIfValidationFailed(hasSucceeded, 500, "deleting contest failed!");

    res.send("DELETE /v1/contest is successful");
  } catch (e) {
    logAndSendError(e, res);
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

    throwIfMissingParams({ userId, contestId, newState });
    throwIfValidationFailed(await isUserAdmin(userId), 401, "User is not admin!");
    throwIfValidationFailed(await isContestStateValid(newState), 400, "Contest state isn't valid");
    throwIfValidationFailed(await isContestIdExists(contestId), 400, "Contest Id doesn't exist");

    const hasSucceeded = await updateContestState(contestId, newState);

    throwIfValidationFailed(hasSucceeded, 500, "update failed!");

    res.send("PUT /v1/contest is successful");
  } catch (e) {
    logAndSendError(e, res);
  }
});

//   GET /v1/contest (body will contain: userId)
//   returns a list of contests
//   return error if userId is not admin
router.get("/v1/contest", jsonParser, async (req, res) => {
  try {
    const userId = req?.query?.userId;

    throwIfMissingParams({ userId });
    throwIfValidationFailed(await isUserAdmin(userId), 401, "User is not admin!");

    const contests = await getAllContests();

    res.send(contests);
  } catch (e) {
    logAndSendError(e, res);
  }
});

module.exports = router;
