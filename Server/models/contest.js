const { mongo } = require("../models/dbHandler");
const { ObjectId } = require("mongodb");
const { ContestStates } = require("../utils/enums");
const { stringify } = require("../utils/stringHelpers");

const addNewContest = async (contestName) => {
  let newContest = { name: contestName, state: ContestStates.UPLOADING };
  const result = await mongo.db().collection("contests").insertOne(newContest);

  return result.acknowledged;
};

const getContestState = async (contestId) => {
  const query = { _id: ObjectId(contestId) };
  const result = await mongo
    .db()
    .collection("contests")
    .findOne(query);  
  return result?.state;
};

const updateContestState = async (contestId, newState) => {
  const query = { _id: ObjectId(contestId) };
  const result = await mongo
    .db()
    .collection("contests")
    .updateOne(query, { $set: { state: newState } });

  return result.modifiedCount == 1;
};

const getAllContests = async () => {
  const contests = await mongo.db().collection("contests").find({}).toArray();
  return contests;
};

const isContestNameExists = async (contestName) => {
  console.log(`mock checking if contest ${contestName} already exists in the DB`);
  return false;
};

const isContestIdExists = async (contestId) => {
  console.log(`mock checking if contest "${stringify(contestId)}" exists in the DB`);
  return true;
};

module.exports = { addNewContest, getContestState, updateContestState, getAllContests, isContestNameExists, isContestIdExists };
