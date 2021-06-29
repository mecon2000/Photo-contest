//should show 1 small photo with/without score (to allow the user to rate)
import React, { useState } from "react";
import { ModalScreen } from "../components/ModalScreen";
import { PhotoDetails } from "../components/PhotoDetails";
import StarRatings from "react-star-ratings";

export function SmallPhoto(props) {
  const { src, setScore, score, id, shouldShowScore = true } = props;
  const [showPhotoDetails, setShowPhotoDetails] = useState(false);

  return (
    <div className="small-photo">
      <img
        src={src}
        alt="alt text"
        onClick={(e) => setShowPhotoDetails(true)}
      />
      {shouldShowScore && (
        <StarRatings
          rating={score}
          starRatedColor="gold"
          starDimension="3vw"
          starSpacing=".3vw"
          changeRating={setScore}
          numberOfStars={5}
          name="rating"
        />
      )}
      {showPhotoDetails && (
        <ModalScreen onClick={(e) => setShowPhotoDetails(false)}>
          <PhotoDetails
            onClick={(ev) => ev.stopPropagation()}
            closePhoto={(e) => setShowPhotoDetails(false)}
            src={src}
          />
        </ModalScreen>
      )}
    </div>
  );
}
