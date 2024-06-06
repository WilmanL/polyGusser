import React from 'react'
import IndividualLeaderBoard from './IndividualLeaderBoard';
import { useState, useEffect} from "react";

export default function SponsorComponent({gameDoc}) {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    fetch('http://3.145.19.247:5000/polygusser/leaderboard')
      .then(response => response.json())
      .then(data => setLeaderBoard(data))
      .catch(error => console.error('Error:', error));
  }, [gameDoc]);
  
  return (
    <div className="card shadow-sm mb-4">
        <div className="card-body">
            <h5 className="card-title">Leader Board 💪🏽</h5>
            {leaderBoard.map((leader, index) => {
              return <IndividualLeaderBoard key={index} userName={leader.user_name} numberOfGuesses={leader.number_of_guesses} date={leader.date}/>
            })}
        </div>
    </div>
  )
}
