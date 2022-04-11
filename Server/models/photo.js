const { mongo } = require("../models/dbHandler");
const { ObjectId } = require("mongodb");

const addNewPhoto = async (userId, contestId, photoDataBolb, fileType) => {
  let newPhoto = { userId, contestId, photoDataBolb, fileType, scoresSum: 0, howManyVoted: 0 };
  const result = await mongo.db().collection("photos").insertOne(newPhoto);

  return result.acknowledged;
};

const get3PhotosWithHighestScore = async (contestId) => {
  let allPhotos = await getPhotosForContest(contestId);
  allPhotos.forEach((p) => {
    p.averageScore = p.howManyVoted > 0 ? p.scoresSum / p.howManyVoted : 0;
  });
  allPhotos.sort((p1, p2) => p1.averageScore - p2.averageScore).reverse();

  const winningPhotosData = {
    contestId,
    winners: allPhotos.splice(0, 3),
  };

  return winningPhotosData;
};

const getPhotosData = async (photoIdArray) => {
  const query = {
    $or: photoIdArray.map((p) => {
      return { _id: ObjectId(p) };
    }),
  };
  const result = await mongo.db().collection("photos").find(query).toArray();
  return result;
};

const updatePhotosData = async (photoDataArray) => {
  const queriesArray = photoDataArray.map((p) => {
    return {
      updateOne: {
        filter: { _id: ObjectId(p._id) },
        update: { $set: { ...p } },
      },
    };
  });

  const result = await mongo.db().collection("photos").bulkWrite(queriesArray);
  return result.ok === 1;
};

const getPhotosForContest = async (contestId) => {
  const query = { contestId };
  const result = await mongo.db().collection("photos").find(query).toArray();
  return result;
};

module.exports = { addNewPhoto, get3PhotosWithHighestScore, getPhotosData, updatePhotosData, getPhotosForContest };
