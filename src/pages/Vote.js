import { useState, useEffect } from "react";
import { SmallPhoto } from "../components/SmallPhoto";
import { downloadAllPhotosWithScores, updatePhotoScore } from "../services/photoService";

export function Vote() {
  const userId = 1;
  const contestId = 1;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getAllPhotos = async () => {
      const photosData = await downloadAllPhotosWithScores({ contestId, userId });
      setPhotos(photosData);
    };
    getAllPhotos();
  }, []);

  const updateScore = (photoId, newScore) => {
    const voterId = 1;
    updatePhotoScore({photoId, voterId, newScore})
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
              setScore={(newScore) => updateScore(p.id, newScore)}
              // score={getScore(p.id)}
            />
          );
        })}
      </div>
    </>
  );
}
