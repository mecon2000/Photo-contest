import { httpService } from "./httpService";
const entity = "photo";

const uploadPhotos = (photos, contestId, userId) => {
  const photosData = photos.map((photo) => ({
    contestId,
    userId,
    photoBlob: photo.blob,
  }));
  //for json-server
  return Promise.all(
    photosData.map((photo) => httpService.post(entity, photo))
  ).then(() => console.log("allahuakbar"));
  /*
    //for real backend
   return httpService.post(entity, photosData);
   */
};

const readFilesFromHd = (files) => {
  const promises = [];
  [...files].forEach((file, i) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    promises.push(
      new Promise((resolve, reject) => {
        reader.onload = function (e) {
          const { name, type } = file;
          resolve({
            name,
            type,
            blob: e.target.result,
          });
          reader.onerror = reject;
        };
      })
    );
  });
  return Promise.all(promises);
};

export const readAndUploadFiles = async (files, contestId, userId) => {
  let filesArr = await readFilesFromHd(files);
  console.log(filesArr);
  return uploadPhotos(filesArr, contestId, userId);
};
