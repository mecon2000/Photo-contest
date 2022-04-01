let { stringify } = require("../utils/stringHelpers");
var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const { mongo } = require("../models/dbHandler");
var router = express.Router();

const ContestStates = Object.freeze({
  UPLOADING: "uploading",
  VOTING: "voting",
  SHOW_WINNERS: "showWinners",
});

///////// helper utils that should be moved to their own file //////////////
const isUserAdmin = (userId) => {
  console.log(`mock checking if user ${userId} is admin`);
  return true;
};

const isContestExists = (contestName) => {
  console.log(
    `mock checking if contest "${contestName}" already exists in the DB`
  );
  return false;
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

  if (isContestExists(contestName)) {
    res.status(400).send({ error: "Contest name already exists" });
    return;
  }

  let newContest = { name: contestName, state: ContestStates.UPLOADING };
  const result = await mongo.db().collection("contests").insertOne(newContest);
  console.log(`res = ${JSON.stringify(result)}`);
  res.send("POST /v1/contest is successful");
});

//   PUT /v1/contest (body will contain: userId, contestId, new state)
//   updates the state of a contest
//   return error if userId is not admin
//   return error if contestId doesn't exist
//   return error if state is same as new state
router.put("/v1/contest", (req, res) => {
  res.send("PUT contest");
});

module.exports = router;
