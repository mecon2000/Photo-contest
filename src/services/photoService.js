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

export const downloadAllPhotosWithScores = async ({ contestId, voterId }) => {
  //for json-server
  const entity = `photo?contestId=${contestId}`;
  //TODO: when we'll have a server, the resulting call should bring back array of objects with photo data
  //and ONLY the scores of this (else it'll be easy to fake the scores of other users)
  const photosData = await httpService.get(entity);



  photosData.map((p) => {
    const scoreOfVoter = p.scores?.find((s) => s.voterId === voterId);
    p.score = scoreOfVoter?.score;
    delete p.scores;
    return p;
  });

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
