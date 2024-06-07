import React from 'react'
import testImage from '../assests/dayLight.jpg';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';


export default function LeftWallComponent() {
  return (
    <div className="col-12 col-lg-3">
        <div className="left-column scrollBar" style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '100vh' }}>
            <div style={{ paddingRight: '10px', marginRight: '-10px' }}>
                <div className="card card-left1 mb-4">
                    <img src={'https://picsum.photos/800/1000'} onError={(e)=>{e.target.onerror = null; e.target.src=testImage}} alt="" className="card-img-top img-fluid" />
                    <div className="card-body text-center">
                    <img src={'https://picsum.photos/800/1000'} onError={(e)=>{e.target.onerror = null; e.target.src=testImage}} alt="img" width="120px" height="120px" className="rounded-circle mt-n5" />
                    <h5 className="card-title">Wilman Li</h5>
                    <p className="card-text text-justify mb-2">I wish I was a little bit tallers.</p>
                    <ul className="list-unstyled nav justify-content-center">
                        <li className="nav-item">Friends <br /> <strong>12M</strong></li>
                        <li className="nav-item">Enemies <br /> <strong>1</strong></li>
                    </ul>
                    </div>
                </div>
            
                <div className="card shadow-sm card-left2 mb-4">
                    <div className="card-body">
                            <h5 className="mb-3 card-title">About <small></small></h5>
                            <p className="card-text"> <i className="fas fa-calendar-week mr-2"></i> Went to oh canada</p>
                            <p className="card-text"> <i className="fas fa-user-friends mr-2"></i> Become a friend with obama</p>
                            <p className="card-text"> <i className="far fa-building mr-2"></i> Work at Github</p>
                            <p className="card-text"> <i className="fas fa-home mr-2"></i> Live in San francisco</p>
                            <p className="card-text"> <i className="fas fa-map-marker mr-2"></i> From Seattle, WA</p>
                    </div>
                </div>
            </div>
            <style>{scrollbarStyles}</style>
        </div>
    </div>
  )
}
