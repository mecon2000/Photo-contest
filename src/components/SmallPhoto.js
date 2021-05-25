//should show 1 small photo with 5 stars (to rate)
export function SmallPhoto(props) {
  const { src, setScore, score, id } = props;

  return (
    <div className="small-photo">
      <img src={src} alt="alt text" />
      <div style={{ textAlign: "center" }}>
        {[...Array(5).keys()].map((i) => {
          return (
            <button
              className={"score-button" + (i+1 === score ? "-selected" : "")}
              key = {id+i}
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
