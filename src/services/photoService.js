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

export const updatePhotoScore = async ({ userId, contestId, photoId, score }) => {
  const body = { userId, contestId, photoId, score };
  httpService.put(entity, body);
};

export const downloadPhotos = async ({ contestId, userId }) => {
  const urlParams = { userId, contestId };

  const photosData = await httpService.get(entity, undefined, urlParams);

  return photosData;
};

export const getWinners = async (contestId) => {
  const urlParams = { winningPhotos: true, contestId };

  const photosData = await httpService.get(entity, undefined, urlParams);

  return photosData.winners;
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
