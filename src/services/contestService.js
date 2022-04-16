import { httpService } from "./httpService";
const entity = "v1/contest";

export const updateContest = async ({ userId, contestId, newState }) => {
  const body = { userId, contestId, newState };
  httpService.put(entity, body);
  //TODO handle error in all funcs here and in photoService
};

export const addContest = async ({ userId, contestName }) => {
  const body = { userId, contestName };
  return httpService.post(entity, body);
};

export const deleteContest = async ({ userId, contestId }) => {
  const body = { userId, contestId };
  httpService.delete(entity, body);
};

export const getContests = async ({ userId }) => {
  const urlParams = { userId };
  const contests = await httpService.get(entity, undefined, urlParams);
  return contests;
};
