const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send(
    "Hello, I'm Photo-Contest Server! Would be nice to have Swagger here"
  );
});

app.listen(port, () => {
  console.log(`Photo-Contest Server, listening on port ${port}`);
});

//   POST /v1/photo (body will contain: contestId, userId, photoDataBolb, fileType)
//   it will write a new photo entity  (with scoresSum=0,howManyVoted=0)
//   return error if contest is not in state of "uploading"
app.post("/v1/photo", (req, res) => {
  res.send("POST photo");
});

//   PUT /v1/photo  (body will contain: userId, array of [photoid, additionToScore])
//   for each photo in the array it will find the photo with <photoid>, add to scoresSum the <additionToScore> and increase by one howManyVoted.
//   if <user> is same as <userId> of the photo - return error (as it means user is trying to vote for himself)
//   return error if contest is not in state of "voting"
app.put("/v1/photo", (req, res) => {
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
app.get("/v1/photo", (req, res) => {
  if (req.query.winningPhotos) {
    const contestId = 1
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

//   POST /v1/contest (body will contain: userId, name (of contest))
//   will create a new contest and put it in state of "uploading".
//   return error if userId is not admin
//   return error if Name already exists
app.post("/v1/contest", (req, res) => {
  res.send("POST contest");
});

//   PUT /v1/contest (body will contain: userId, contestId, new state)
//   return error if userId is not admin
//   return error if contestId doesn't exist
//   return error if state is same as new state
app.put("/v1/contest", (req, res) => {
  res.send("PUT contest");
});
