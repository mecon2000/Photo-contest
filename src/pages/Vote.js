import { useState, useEffect } from "react";
import { SmallPhoto } from "../components/SmallPhoto";
import {
  downloadAllPhotosWithScores,
  updatePhotoScore,
} from "../services/photoService";

export function Vote() {
  const voterId = 1;
  const contestId = 1;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getAllPhotos = async () => {
      const photosData = await downloadAllPhotosWithScores({
        contestId,
        voterId,
      });
      setPhotos(photosData);
    };
    getAllPhotos();
  }, []);

  const updateScore = (photoId, newScore) => {
    const voterId = 1;
    updatePhotoScore({ photoId, voterId, newScore });
    photos.find((p) => p.id === photoId).score = newScore;
    setPhotos([...photos]);
  };

  return (
    <>
      <h1>Vote!</h1>
      <div className="masonry-with-columns">
        {photos.map((p, i) => {
          
          return (
            <SmallPhoto
              src={p.photoDataUrl}
              alt={i}
              key={p.id}
              id={p.id}
              score={p.score}
              setScore={(newScore) => updateScore(p.id, newScore)}
            />
          );
        })}
      </div>
    </>
  );
}
