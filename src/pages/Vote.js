import React, {useState, useEffect } from "react";
import { SmallPhoto } from "../components/SmallPhoto";
import { downloadAllPhotos } from "../services/photoService";

export function Vote() {
  const userId = 1;
  const contestId = 1;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getAllPhotos = async () => {
      const photosData = await downloadAllPhotos({ contestId, userId });
      setPhotos(photosData);
    };
    getAllPhotos();
  }, []);

  const updateScore = (index, score) => {};

  return (
    <>
      <h1>Vote!</h1>
      <div className="masonry-with-columns">
        {photos.map((p, i) => {
          // return <img src={p.photoDataUrl} alt={i} key={"photo" + i} />;
          return (
            <SmallPhoto
              src={p.photoDataUrl}
              alt={i}
              key={"photo" + i}
              updateScore={(score) => updateScore(i, score)}
            />
          );
        })}
      </div>
    </>
  );
}
