import { httpService } from "./httpService";
const entity = "v1/photo";

export const uploadPhotos = ({ photos, contestId, userId }) => {
  const photosData = photos.map((p) => ({
    photoDataBlob: p.photoDataUrl,
    fileType: p.type,
  }));

  const body = {
    contestId,
    userId,
    photos: photosData,
  };
  return httpService.post(entity, body);
};

const getPhotoData = (photoId) => {
  const photoData = httpService.get(`photo/${photoId}`);
  return photoData;
};

const updatePhotoWithNewScore = ({ photoData, voterId, newScore }) => {
  if (!photoData.scores) {
    photoData.scores = [];
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
  //TODO: when we'll have a server, we won't need to getPhotoData just setPhotoData,
  //and let the server add new score to the existing ones

  let photoData = await getPhotoData(photoId);
  updatePhotoWithNewScore({ photoData, voterId, newScore });
  setPhotoData(photoId, photoData);
};

export const downloadPhotos = async ({ contestId, userId }) => {
  
  const entity = `v1/photo`;
  const urlParams = {userId, contestId}
  
  const photosData = await httpService.get(entity, undefined, urlParams);


  return photosData;
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
