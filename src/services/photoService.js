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

export const downloadAllPhotos = async ({ contestId, userId }) => {
  //for json-server
  const entity = `photo?contestId=${contestId}&userId=${userId}`;
  const photosData = await httpService.get(entity);
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
