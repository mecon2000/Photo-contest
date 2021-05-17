import { httpService } from "./httpService";
const entity = "photo";

export const uploadPhotos = ({ photos, contestId, userId }) => {
  const photosData = photos.map((photo) => ({
    contestId,
    userId,
    photoDataUrl: photo.photoDataUrl,
    type: photo.type,
  }));
  //for json-server
  return Promise.all(
    photosData.map((photo) => httpService.post(entity, photo))
  );
  /*
    //for real backend
   return httpService.post(entity, photosData);
   */
};

const getPhotoData = (photoId) => {
  const photoData = httpService.get(`photo/${photoId}`);
  return photoData;
};

const updatePhotoWithNewScore = ({ photoData, voterId, newScore }) => {
  if (!photoData.scores) {
    photoData.scrores = [];
  }

  let scoreOfThisVoter = photoData.scores.find((p) => {
    return p.voterId === voterId;
  });
  if (scoreOfThisVoter) {
    scoreOfThisVoter.score = newScore;
  } else {
    photoData.scores.push({ voterId, score: newScore });
  }
};

const setPhotoData = (photoId, photoData) => {
  httpService.put(`photo/${photoId}`, photoData);
};

export const updatePhotoScore = async ({ photoId, voterId, newScore }) => {
  let photoData = await getPhotoData(photoId);
  updatePhotoWithNewScore({ photoData, voterId, newScore });
  setPhotoData(photoId, photoData);
};

export const downloadAllPhotosWithScores = async ({ contestId, userId }) => {
  //for json-server
  const entity = `photo?contestId=${contestId}`;
  const photosData = await httpService.get(entity);
  //TODO: get scores by current userId, for each photo. do it in one call!
  return photosData; //should contain the known scores by this user for that contest
};

export const readFileFromHd = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onload = function (e) {
      resolve(e.target.result);
      reader.onerror = reject;
    };
  });
};
