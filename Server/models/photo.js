const { mongo } = require("../models/dbHandler");
const { ObjectId } = require("mongodb");

const addNewPhoto = async (userId, contestId, photoDataBolb, fileType) => {
  let newPhoto = { userId, contestId, photoDataBolb, fileType, scoresSum: 0, howManyVoted: 0 };
  const result = await mongo.db().collection("photos").insertOne(newPhoto);

  return result.acknowledged;
};

const get3PhotosWithHighestScore = async (contestId) => {
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
  throw "not tested yet!!";
  const query = { contestId }    
  const result = await mongo.db().collection("photos").find(query).toArray();
  return result;
};

module.exports = { addNewPhoto, get3PhotosWithHighestScore, getPhotosData, updatePhotosData, getPhotosForContest };
