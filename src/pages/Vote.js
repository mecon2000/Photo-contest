import { useState, useEffect } from "react";
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

  return (
    <>
      <h2>Vote!</h2>
      <div className="masonry-with-columns">
        {photos.map((p, i) => {
          return <img src={p.photoDataUrl} alt={i} key={"photo" + i} />;
        })}
      </div>
    </>
  );
}
