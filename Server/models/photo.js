const { mongo } = require("../models/dbHandler");
const { ObjectId } = require("mongodb");

const photosDBCollection = mongo.db().collection("photos");

const addNewPhotos = async (userId, contestId, photos) => {
  const photosAsDocs = photos.map((p) => ({
    userId,
    contestId,
    photoDataBlob: p.photoDataBlob,
    fileType: p.fileType,
    votes: [],
  }));
  const result = await photosDBCollection.insertMany(photosAsDocs);
  return result.acknowledged;
};

const calcVotesAverage = (votes) => {
  if (votes.length === 0) return 0;
  const sum = votes.reduce((prev, curr) => prev + curr.score, 0);
  return sum / votes.length;
};

const get3PhotosWithHighestScore = async (contestId) => {
  let allPhotos = await getPhotosForContest(contestId);
  allPhotos.forEach((p) => {
    p.averageScore = calcVotesAverage(votes);
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
  const result = await photosDBCollection.find(query).toArray();
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

  const result = await photosDBCollection.bulkWrite(queriesArray);
  return result.ok === 1;
};

const getPhotosForContest = async (contestId) => {
  const query = { contestId };
  const result = await photosDBCollection.find(query).toArray();
  return result;
};

module.exports = { addNewPhotos, get3PhotosWithHighestScore, getPhotosData, updatePhotosData, getPhotosForContest };
