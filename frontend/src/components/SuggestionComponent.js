import React from 'react'
import testImage from '../assests/test.jpg';

export default function SuggestionComponent() {
  return (
    <div className="card shadow-sm mb-4">
        <div className="card-body">
            <h6 className="card-title">Likes <small>.View All</small></h6>
            <div className="row no-gutters d-none d-lg-flex">
                <div className="col-6 p-1">
                <img src={'https://picsum.photos/800/1000'} alt="img" width="80px" height="80px" className="rounded-circle mb-4" />
                <img src={'https://picsum.photos/800/1000'} alt="img" width="80px" height="80px" className="rounded-circle" />
                </div>
                <div className="col-6 p-1 text-left">
                <h6>Jacob Thornton @fat</h6>
                <i className="fas fa-user-friends"></i>Follow
                <h6>Mark Otto</h6>
                <i className="fas fa-user-friends"></i>Follow
                </div>
            </div>
        </div>
        <div className="card-footer">
            <p className="lead" style={{ fontSize: "18px" }}>Dave really likes these nerds, no one knows why though.</p>
        </div>
    </div>
  )
}
