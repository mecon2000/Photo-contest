import { useState } from "react";

//should show 1 small photo with 5 stars (to rate)
export function SmallPhoto(props) {
  const { src, updateScore } = props;
  const [score, setScore] = useState(0);

  const handleOnClick = (score) => {
    setScore(score);
    updateScore(score);
  };

  return (
    <div className="photo-details">
      <img src={src} alt="alt text" />
      <div style={{ textAlign: "center" }}>
        {[...Array(5).keys()].map((i) => {
          return (
            <button
              onClick={(e) => {
                handleOnClick(i + 1);
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
