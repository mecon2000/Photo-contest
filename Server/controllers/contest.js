const { stringify } = require("../utils/stringHelpers");
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
  console.log(
    `mock checking if contest ${contestName} already exists in the DB`
  );
  return false;
};

const isContestIdExists = (contestId) => {
  console.log(
    `mock checking if contest "${stringify(contestId)}" exists in the DB`
  );
  return true;
};

/////////////////////////////////////////////////////////////////////////////

//Middle ware that is specific to this router
// router.use((req, res, next) => {
//   console.log(`Contest api: ${req.originalUrl}`);
//   if (req.body) {
//     console.log(`\tBody=${JSON.stringify(req.body)}`);
//   }
//   next();
// });

// const usingDbExample = async () => {
//   const databasesList = await mongo.db().admin().listDatabases();
//   console.log("Databases:");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// };

//   POST /v1/contest (body must contain: userId, name (of contest))
//   will create a new contest and put it in state of "uploading".
//   return error if userId is not admin
//   return error if Name already exists
router.post("/v1/contest", jsonParser, async (req, res) => {
  const userId = req?.body?.userId;
  const contestName = req?.body?.name;

  if (!userId || !contestName) {
    res.status(400).send({ error: "Missing parameters" });
    console.log(`req.body = ${stringify(req.body)}`);
    return;
  }

  if (!isUserAdmin(userId)) {
    res.status(401).send({ error: "User is not admin!" });
    return;
  }

  if (isContestNameExists(contestName)) {
    res.status(400).send({ error: "Contest name already exists" });
    return;
  }

  let newContest = { name: contestName, state: ContestStates.UPLOADING };
  const result = await mongo.db().collection("contests").insertOne(newContest);

  if (!result.acknowledged) {
    res.status(500).send({ error: "adding a contest failed!" });
    console.log(
      `adding a contest failed, object returned from db: ${stringify(result)}`
    );
    return;
  }

  res.send("POST /v1/contest is successful");
});

//   PUT /v1/contest (body will contain: userId, contestId, newState)
//   updates the state of a contest
//   return error if userId is not admin
//   return error if contestId doesn't exist
router.put("/v1/contest", jsonParser, async (req, res) => {
  const userId = req?.body?.userId;
  const contestId = req?.body?.contestId;
  const newState = req?.body?.newState;

  if (!userId || !contestId || !newState) {
    res.status(400).send({ error: "Missing parameters" });
    console.log(`req.body = ${stringify(req.body)}`);
    return;
  }

  if (!isUserAdmin(userId)) {
    res.status(401).send({ error: "User is not admin!" });
    return;
  }

  if (!isContestStateValid(newState)) {
    res.status(400).send({ error: "Contest state isn't valid" });
    return;
  }

  if (!isContestIdExists(contestId)) {
    res.status(400).send({ error: "Contest Id doesn't exist" });
    return;
  }

  const query = { _id: ObjectId(contestId) };
  const result = await mongo
    .db()
    .collection("contests")
    .updateOne(query, { $set: { state: newState } });

  if (result.modifiedCount != 1) {
    res.status(500).send({ error: "update failed!" });
    console.log(
      `updating status of a contest failed, object returned from db: ${stringify(
        result
      )}`
    );
    return;
  }

  res.send("PUT /v1/contest is successful");
});

module.exports = router;
