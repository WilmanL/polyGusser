import React from 'react'
import dayLight from "../assests/dayLight.jpg";
import MainCardCommentsComponent from './MainCardCommentsComponent';

export default function PostContent({user_name, guess_number, date, last_guess, postContent, wordOfTheDay}) {
  return (
    <div className="card-body">
        <div className="media">
            <img src={'https://picsum.photos/800/1000'} onError={(e)=>{e.target.onerror = null; e.target.src=dayLight}} alt="img" width="55px" height="55px" className="rounded-circle mr-3" />
            <div className="media-body">
                <h5>{user_name}</h5>
                <p className="card-text text-justify">{postContent}</p>
                
                <div className="row no-gutters mb-3">
                    <div className="col-6 p-1 text-center">
                      <img src={`https://picsum.photos/800/1000?random=${Math.random()}`} onError={(e)=>{e.target.onerror = null; e.target.src=dayLight}} alt="" className="img-fluid mb-2" />
                      <img src={`https://picsum.photos/800/1000?random=${Math.random()}`} onError={(e)=>{e.target.onerror = null; e.target.src=dayLight}} alt="" className="img-fluid" />
                    </div>
                    <div className="col-6 p-1 text-center">
                      <img src={`https://picsum.photos/800/1000?random=${Math.random()}`} onError={(e)=>{e.target.onerror = null; e.target.src=dayLight}} alt="" className="img-fluid mb-2" />
                      <img src={`https://picsum.photos/800/1000?random=${Math.random()}`} onError={(e)=>{e.target.onerror = null; e.target.src=dayLight}} alt="" className="img-fluid" />
                    </div>
                </div>
                
                <MainCardCommentsComponent guess_number = {guess_number} last_guess = {last_guess} wordOfTheDay = {wordOfTheDay} user_name = {user_name}/>
                
            </div>
            {/* posted time shown */}
            <small>{date}</small>
        </div>
    </div>
  )
}
