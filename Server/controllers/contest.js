const { stringify } = require("../utils/stringHelpers");
const { ValidationException, throwIfValidationFailed } = require("../utils/validationsHelper");
const { ContestStates, isContestStateValid } = require("../utils/enums");
const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { mongo } = require("../models/dbHandler");
const { ObjectId } = require("mongodb");
const router = express.Router();

///////// helper utils that should be moved to their own file //////////////
const isUserAdmin = (userId) => {
  console.log(`mock checking if user ${userId} is admin`);
  return true;
};

const isContestNameExists = (contestName) => {
  console.log(`mock checking if contest ${contestName} already exists in the DB`);
  return false;
};

const isContestIdExists = (contestId) => {
  console.log(`mock checking if contest "${stringify(contestId)}" exists in the DB`);
  return true;
};

/////////////////////////////////////////////////////////////////////////////

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

    let newContest = { name: contestName, state: ContestStates.UPLOADING };
    const result = await mongo.db().collection("contests").insertOne(newContest);

    throwIfValidationFailed(result.acknowledged, 500, "adding a contest failed!");

    res.send("POST /v1/contest is successful");
  } catch (e) {
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

    const query = { _id: ObjectId(contestId) };
    const result = await mongo
      .db()
      .collection("contests")
      .updateOne(query, { $set: { state: newState } });

    throwIfValidationFailed(result.modifiedCount == 1, 500, "update failed!");

    res.send("PUT /v1/contest is successful");
  } catch (e) {
    if (e instanceof ValidationException) {
      res.status(e.errCode).send(e.errMessage);
    } else res.status(500).send("failed for unknown reason");
  }
});

module.exports = router;
