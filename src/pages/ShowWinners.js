import React, { useState } from "react";

export function ShowWinners() {
  // photoservice.getWinners()
  // .then(w=>setWinners(w)

  const [winners, setWinners] = useState(['1', '2', '3']);
  return (winners.length ? <main className="main-container show-winners">
    <h2>And The Winner is...</h2>
    <section className="winners">
      <div className="second-place">{winners[1]}</div>
      <div className="first-place">{winners[0]}</div>
      <div className="third-place">{winners[2]}</div>
    </section>
  </main> : <p>waiting for server</p>
  )
};