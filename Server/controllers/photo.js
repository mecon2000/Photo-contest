const express = require("express");
const { ValidationException, throwIfValidationFailed } = require("../utils/validationsHelper");
const { ContestStates } = require("../utils/enums");
const {
  addNewPhotos,
  get3PhotosWithHighestScore,
  getPhotosData,
  updatePhotosData,
  getPhotosForContest,
} = require("../models/photo");
const { getContestState } = require("../models/contest");
const bodyParser = require("body-parser");
const { stringify } = require("../utils/stringHelpers");
const jsonParser = bodyParser.json();
var router = express.Router();

//   POST /v1/photo (body will contain: contestId, userId, photos:[{photoDataBlob, fileType}])
//   it will write a new photo entity  (with scoresSum=0,howManyVoted=0)
//   return error if contest is not in state of "uploading"
router.post("/v1/photo", jsonParser, async (req, res) => {
  try {
    const { userId, contestId, photos } = req?.body;
    throwIfValidationFailed(userId && contestId && photos, 400, "missing Parameters");
    photos.forEach((p) => throwIfValidationFailed(p.photoDataBlob && p.fileType, 400, "missing Parameters"));

    console.log(`userId=${userId}, contestId=${contestId}, photos=${JSON.stringify(photos[1])}`);
    throwIfValidationFailed(
      (await getContestState(contestId)) == ContestStates.UPLOADING,
      400,
      "Contest does not accept new photos"
    );

    const hasSucceeded = await addNewPhotos(userId, contestId, photos);

    throwIfValidationFailed(hasSucceeded, 500, "adding a photo failed!");

    res.send("POST /v1/photo is successful");
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationException) {
      res.status(e.errCode).send(e.errMessage);
    } else res.status(500).send("failed for unknown reason");
  }
});

//   PUT /v1/photo  (body will contain: userId, contestId, photosToUpdate:[{photoId, additionToScore},{...}])
//   for each photo in the array it will find the photo with <photoId>, add to scoresSum the <additionToScore> and increase by one howManyVoted.
//   if <user> is same as <userId> of the photo - return error (as it means user is trying to vote for himself)
//   return error if contest is not in state of "voting"
router.put("/v1/photo", jsonParser, async (req, res) => {
  try {
    const { userId, contestId, photosToUpdate } = req?.body;

    throwIfValidationFailed(userId && photosToUpdate && contestId, 400, "missing Parameters");
    throwIfValidationFailed(
      (await getContestState(contestId)) === ContestStates.UPLOADING,
      400,
      "Contest does not accept new photos"
    );

    const currentPhotosData = await getPhotosData(photosToUpdate.map((p) => p.photoId));
    currentPhotosData.forEach((photoDataFromDb) => {
      throwIfValidationFailed(photoDataFromDb.userId != userId, 400, "User cannot vote to his own photos");
      const additionToScore = photosToUpdate.filter((p) => p.photoId == photoDataFromDb._id)[0].additionToScore;
      photoDataFromDb.scoresSum += additionToScore;
      photoDataFromDb.howManyVoted++;
    });

    const hasSucceeded = await updatePhotosData(currentPhotosData);

    throwIfValidationFailed(hasSucceeded, 500, "update failed!");

    res.send("PUT /v1/contest is successful");
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationException) {
      res.status(e.errCode).send(e.errMessage);
    } else res.status(500).send("failed for unknown reason");
  }
});

//   GET /v1/photo  (body will contain: contestId,userId)  OR:
//   GET /v1/photo?winningPhotos=true (body will contain: contestId)
//   if winningPhotos==true:
//     will return the 3 photos with highest score. (returns: contestId, for each photo {userId, averageScore, photoDataBlob, some more unimportant fields}
//     return error if contest is not in state of "winning"
//   if no winningPhotos:
//     Will return an array of photos, for the current contast, WITHOUT the photos taken by userId.
//     return error if contestId, userId do not exist
router.get("/v1/photo", jsonParser, async (req, res) => {
  try {
    const { contestId } = req?.body;
    throwIfValidationFailed(contestId, 400, "missing Parameters");

    if (req?.query?.winningPhotos) {
      throwIfValidationFailed(
        (await getContestState(contestId)) === ContestStates.SHOW_WINNERS,
        400,
        "Contest is not over yet"
      );
      res.send(await get3PhotosWithHighestScore(contestId));
    } else {
      const { userId } = req?.body;
      throwIfValidationFailed(userId, 400, "missing Parameters");
      const photos = await getPhotosForContest(contestId);
      const filteredPhotos = photos.filter((p) => p.userId != userId);
      res.send(filteredPhotos);
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationException) {
      res.status(e.errCode).send(e.errMessage);
    } else res.status(500).send("failed for unknown reason");
  }
});
module.exports = router;
