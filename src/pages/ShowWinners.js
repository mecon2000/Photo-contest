import React, { useState } from "react";

export function ShowWinners() {
  // photoservice.getWinners()
  // .then(w=>setWinners(w)

  const [winners, setWinners] = useState([
    {
      name: "Avi",
      img: "https://robohash.org/Avi",
      score: 3.14
    },
    {
      name: "Beni",
      img: "https://robohash.org/Beni",
      score: 2.71
    },
    {
      name: "Coral",
      img: "https://robohash.org/Coral",
      score: 1.41
    }]);
  return (winners.length ? <main className="main-container show-winners">
    <h2>And The Winner is...</h2>
    <section className="winners">
      <div className="second-place">
        <img className="winning-photo" src={winners[1].img} alt={winners[1].name} />
        <div className="stand">2</div>
      </div>
      <div className="first-place">
        <img className="winning-photo" src={winners[0].img} alt={winners[0].name} />
        <div className="stand">1</div>
      </div>
      <div className="third-place">
        <img className="winning-photo" src={winners[2].img} alt={winners[2].name} />
        <div className="stand">3</div>
      </div>
    </section>
  </main> : <p>waiting for server</p>
  )
};

