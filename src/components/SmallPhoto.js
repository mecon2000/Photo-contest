//should show 1 small photo with/without score (to allow the user to rate)
import React, {  useState,} from "react";
import { ModalScreen } from "../components/ModalScreen";
import { PhotoDetails } from "../components/PhotoDetails";

export function SmallPhoto(props) {
  const { src, setScore, score, id, shouldShowScore = true } = props;
  const [showPhotoDetails, setShowPhotoDetails] = useState(false);

  return (
    <div className="small-photo">
      <img src={src} alt="alt text" onClick={e=>setShowPhotoDetails(true)}/>
      {shouldShowScore && (
        <div style={{ textAlign: "center" }}>
          {[...Array(5).keys()].map((i) => {
            return (
              <button
                className={
                  "score-button" + (i + 1 === score ? "-selected" : "")
                }
                key={id + i}
                onClick={(e) => {
                  setScore(i + 1);
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      )}
      {showPhotoDetails && (
        <ModalScreen onClick={(e) => setShowPhotoDetails(false)}>
          <PhotoDetails onClick={(ev)=>ev.stopPropagation()} closePhoto={e=>setShowPhotoDetails(false)} src={src} />
        </ModalScreen>
      )}
    </div>
  );
}
