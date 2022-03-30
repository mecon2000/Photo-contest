var express = require("express");
const { mongo } = require("../models/dbHandler");
var router = express.Router();

//Middle ware that is specific to this router
router.use((req, res, next) => {
  console.log(`Contest api: ${req.originalUrl}`);
  if (req.body) {
    console.log(`\tBody=${JSON.stringify(req.body)}`);
  }
  next();
});

const usingDbExample = async () => {
  const databasesList = await mongo.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

//   POST /v1/contest (body will contain: userId, name (of contest))
//   will create a new contest and put it in state of "uploading".
//   return error if userId is not admin
//   return error if Name already exists
router.post("/v1/contest", async (req, res) => {
  await usingDbExample();
  res.send("POST contest");
});

//   PUT /v1/contest (body will contain: userId, contestId, new state)
//   return error if userId is not admin
//   return error if contestId doesn't exist
//   return error if state is same as new state
router.put("/v1/contest", (req, res) => {
  res.send("PUT contest");
});

module.exports = router;
