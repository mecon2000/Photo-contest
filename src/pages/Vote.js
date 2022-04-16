import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SmallPhoto } from "../components/SmallPhoto";
import { downloadPhotos, updatePhotoScore } from "../services/photoService";

export function Vote() {
  const userId = 1;
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get("contestId")
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getAllPhotos = async () => {
      const photosData = await downloadPhotos({ contestId, userId });
      setPhotos(photosData);
    };
    getAllPhotos();
  }, [contestId]);

  const updateScore = (photoId, newScore) => {
    updatePhotoScore({ userId, contestId, photoId, score: newScore });
    photos.find((p) => p._id === photoId).score = newScore;
    setPhotos([...photos]);
  };

  return (
    <>
      <h1>Vote!</h1>
      <div className="masonry-with-columns">
        {photos.map((p, i) => {
          return (
            <SmallPhoto
              src={p.photoDataBlob}
              alt={i}
              key={`smallPhoto${i}`}
              id={p._id}
              score={p.score}
              setScore={(newScore) => updateScore(p._id, newScore)}
            />
          );
        })}
      </div>
    </>
  );
}
