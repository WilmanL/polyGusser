import React from 'react'
import testImage from '../assests/NekoAtsumeSponsor.jpg';

export default function SponsorComponent() {
  return (
    <div className="card shadow-sm mb-4">
        <div className="card-body">
            <h6 className="card-title">Sponsored</h6>
            <img src={testImage} alt="card-img" className="card-img mb-3" />
            <p className="card-text text-justify">
            <span className="h6">It might be time to visit Iceland.</span> Iceland is so chill, and everything looks cool here. Also, we heard the people are pretty nice. What are you waiting for?
            </p>
            <a href="#" className="btn btn-outline-info card-link btn-sm">Buy a ticket</a>
        </div>
    </div>
  )
}
