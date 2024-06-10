import React from 'react'
import testImage from '../assests/test.jpg';

export default function MainCardCommentsComponent({guess_number, last_guess, wordOfTheDay, user_name}) {
  return (
    <div className="media mb-3">
        <img src={'https://picsum.photos/800/1000'} onError={(e)=>{e.target.onerror = null; e.target.src=testImage}} alt="img" width="45px" height="45px" className="rounded-circle mr-2" />
        <div className="media-body">
        <h5>{user_name}: </h5>
        <p className="card-text text-justify">
          <span style={{fontWeight: 'bold'}}>Guess Number:</span> {guess_number} <br/>
          <span style={{fontWeight: 'bold'}}>Last Guess:</span> {last_guess}  <br/>
          <span style={{fontWeight: 'bold'}}>Word of the Day:</span> {wordOfTheDay} <br/>
        </p>
        </div>
    </div>
  )
}