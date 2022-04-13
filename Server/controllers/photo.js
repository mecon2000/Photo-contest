const express = require("express");
const {
  ValidationException,
  throwIfValidationFailed,
  throwIfMissingParams,
  logAndSendError,
} = require("../utils/validationsHelper");
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
//   it will write a new photo entity
//   return error if contest is not in state of "uploading"
router.post("/v1/photo", jsonParser, async (req, res) => {
  try {
    const { userId, contestId, photos } = req?.body;
    throwIfMissingParams({ userId, contestId, photos });
    photos.forEach((p) => throwIfMissingParams({ photoDataBlob: p.photoDataBlob, fileType: p.fileType }));

    throwIfValidationFailed(
      (await getContestState(contestId)) == ContestStates.UPLOADING,
      400,
      "Contest does not accept new photos"
    );

    const hasSucceeded = await addNewPhotos(userId, contestId, photos);

    throwIfValidationFailed(hasSucceeded, 500, "adding a photo failed!");

    res.send("POST /v1/photo is successful");
  } catch (e) {
    logAndSendError(e, res);
  }
});

//   PUT /v1/photo  (body will contain: userId, contestId, photoId, score
//   will add to the list of scores another {userId, score}
//   if <user> is same as <userId> of the photo - return error (as it means user is trying to vote for himself)
//   return error if contest is not in state of "voting"
router.put("/v1/photo", jsonParser, async (req, res) => {
  try {
    const { userId, contestId, photoId, score } = req?.body;
    throwIfMissingParams({ userId, contestId, photoId, score });
    const contestState = await getContestState(contestId);
    throwIfValidationFailed(contestState === ContestStates.VOTING, 400, "Contest does not accept new votes");

    const [photoFromDb] = await getPhotosData([photoId]);

    throwIfValidationFailed(photoFromDb.userId != userId, 400, "User cannot vote to his own photos");
    const ind = photoFromDb.votes.findIndex((v) => v.userId == userId);
    if (ind === -1) photoFromDb.votes.push({ userId, score });
    else photoFromDb.votes[ind] = { userId, score };

    const hasSucceeded = await updatePhotosData([photoFromDb]);

    throwIfValidationFailed(hasSucceeded, 500, "update failed!");

    res.send("PUT /v1/contest is successful");
  } catch (e) {
    logAndSendError(e, res);
  }
});

//   GET /v1/photo?contestId=<id>&userId=<id>)  OR:
//   GET /v1/photo?winningPhotos=true&contestId=<id>
//   if winningPhotos==true:
//     will return the 3 photos with highest score. (returns: contestId, for each photo {userId, averageScore, photoDataBlob, some more unimportant fields}
//     return error if contest is not in state of "winning"
//   if no winningPhotos:
//     Will return an array of photos, for the current contast, WITHOUT the photos taken by userId, and without the scores
//     return error if contestId, userId do not exist
router.get("/v1/photo", jsonParser, async (req, res) => {
  try {
    const { contestId } = req?.query;
    throwIfMissingParams({ contestId });

    if (req?.query?.winningPhotos) {
      throwIfValidationFailed(
        (await getContestState(contestId)) === ContestStates.SHOW_WINNERS,
        400,
        "Contest is not over yet"
      );
      res.send(await get3PhotosWithHighestScore(contestId));
    } else {
      const { userId } = req?.query;

      throwIfMissingParams({ userId });
      const photos = await getPhotosForContest(contestId);
      const photosWithoutCurrentUser = photos.filter((p) => p.userId != userId);
      photosWithoutCurrentUser.forEach((p) => {
        delete p.votes;
      });
      res.send(photosWithoutCurrentUser);
    }
  } catch (e) {
    logAndSendError(e, res);
  }
});
module.exports = router;
