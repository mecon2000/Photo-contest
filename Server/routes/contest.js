var express = require("express");
var router = express.Router();

//Middle ware that is specific to this router
router.use((req, res, next) => {
  console.log(`Contest api: ${req.originalUrl}`);
  if (req.body) {
    console.log(`\tBody=${JSON.stringify(req.body)}`);
  }
  next();
});

//   POST /v1/contest (body will contain: userId, name (of contest))
//   will create a new contest and put it in state of "uploading".
//   return error if userId is not admin
//   return error if Name already exists
router.post("/v1/contest", (req, res) => {
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
