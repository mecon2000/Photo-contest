import React, { useState,useEffect } from "react";
import { getWinners } from "../services/photoService";


export function ShowWinners() {
  const [winners, setWinners] = useState([]);
  const contestId = "6246f6f52971fd6c3df09976"

  useEffect(() => {
    const getWinningPhotos = async () => {
      const winningPhotos = await getWinners(contestId);
      setWinners(winningPhotos);
    };
    getWinningPhotos();
  }, []);  
   
  return (winners.length ? <main className="main-container show-winners">
    <h2>And The Winner is...</h2>
    <section className="winners">
      <div className="second-place">
        <img className="winning-photo" src={winners[1].photoDataBlob} alt={winners[1]._id} />
        <div className="stand">2</div>
      </div>
      <div className="first-place">
        <img className="winning-photo" src={winners[0].photoDataBlob} alt={winners[0]._id} />
        <div className="stand">1</div>
      </div>
      <div className="third-place">
        <img className="winning-photo" src={winners[2].photoDataBlob} alt={winners[2]._id} />
        <div className="stand">3</div>
      </div>
    </section>
  </main> : <p>waiting for server</p>
  )
};

