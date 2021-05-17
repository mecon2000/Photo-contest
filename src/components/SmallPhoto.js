//should show 1 small photo with 5 stars (to rate)
export function SmallPhoto(props) {
  const { src, setScore, score, key } = props;

  return (
    <div className="small-photo">
      <img src={src} alt="alt text" />
      <div style={{ textAlign: "center" }}>
        {[...Array(5).keys()].map((i) => {
          return (
            <button
              className={"score-button" + (i === score ? "-selected" : "")}
              key = {key+i}
              onClick={(e) => {
                setScore(i + 1);
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
