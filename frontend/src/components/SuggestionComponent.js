import React from 'react'
import testImage from '../assests/NayeliPFP.jpg';
import DrewImage from '../assests/DrewPFP.jpg';


export default function SuggestionComponent() {
  return (
    <div className="card shadow-sm mb-4">
        <div className="card-body">
            <h6 className="card-title">Likes <a href="#" className="ml-1"><small>.View All</small></a></h6>
            <div className="row no-gutters d-none d-lg-flex">
                <div className="col-6 p-1">
                <img src={testImage} alt="img" width="80px" height="80px" className="rounded-circle mb-4" />
                <img src={DrewImage} alt="img" width="80px" height="80px" className="rounded-circle" />
                </div>
                <div className="col-6 p-1 text-left">
                <h6>Nayeli M</h6>
                <a href="#" className="btn btn-outline-info btn-sm mb-3"><i className="fas fa-user-friends"></i>Follow</a>
                <h6>Saumitra T</h6>
                <a href="#" className="btn btn-outline-info btn-sm"><i className="fas fa-user-friends"></i>Follow</a>
                </div>
            </div>
        </div>
        <div className="card-footer">
            <p className="lead" style={{ fontSize: "18px" }}>Dave really likes these nerds, no one knows why though.</p>
        </div>
    </div>
  )
}
