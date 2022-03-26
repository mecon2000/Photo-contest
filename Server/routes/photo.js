var express = require("express");
var router = express.Router();

//Middle ware that is specific to this router
router.use((req, res, next) => {
  console.log(`Photos api: ${req.originalUrl}`);
  if (req.body) {
    console.log(`\tBody=${JSON.stringify(req.body)}`);
  }
  next();
});

//   POST /v1/photo (body will contain: contestId, userId, photoDataBolb, fileType)
//   it will write a new photo entity  (with scoresSum=0,howManyVoted=0)
//   return error if contest is not in state of "uploading"
router.post("/v1/photo", (req, res) => {
  res.send("POST photo");
});

//   PUT /v1/photo  (body will contain: userId, array of [photoid, additionToScore])
//   for each photo in the array it will find the photo with <photoid>, add to scoresSum the <additionToScore> and increase by one howManyVoted.
//   if <user> is same as <userId> of the photo - return error (as it means user is trying to vote for himself)
//   return error if contest is not in state of "voting"
router.put("/v1/photo", (req, res) => {
  res.send("PUT photo");
});

//   GET /v1/photo  (body will contain: contestId,userId)  OR:
//   GET /v1/photo?winningPhotos=true
//   if winningPhotos==true:
//     will return the 3 photos with highest score. (returns: contestId, for each photo {userId, score, photo
//     return error if contest is not in state of "winning"
//   if no winningPhotos:
//     Will return an array of photos, for the cuurent contast, WITHOUT the photos taken by userId.
//     return error if contestId, userId do not exist
//     return error if contest is not in state of "voting"
router.get("/v1/photo", (req, res) => {
  if (req.query.winningPhotos) {
    const contestId = 1;
    if (getContestMode(contestId) != "winning") {
      res.status(500).send("contest is not in winning mode");
    } else {
      res.send(get3PhotosWithHighestScore(contestId));
    }
  } else {
    res.send("GET photo");
  }
});

//TODO implement this:
const getContestMode = (contestId) => {
  return "winning";
};

//TODO implement this:
const get3PhotosWithHighestScore = (contestId) => {
  const winningPhotosData = {
    contestId,
    winners: [
      { userId: 1, score: 4, photo: "someUrl1" },
      { userId: 2, score: 4.1, photo: "someUrl2" },
      { userId: 3, score: 4.2, photo: "someUrl3" },
    ],
  };

  return winningPhotosData;
};

module.exports = router;
