import React from 'react'
import ryPFP from '../assests/RyPFP.jpg';
import flowers from '../assests/flowerField.jpg';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';


export default function LeftWallComponent() {
  return (
    <div className="col-12 col-lg-3">
        <div className="left-column scrollBar" style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '100vh' }}>
            <div style={{ paddingRight: '10px', marginRight: '-10px' }}>
                <div className="card card-left1 mb-4">
                    <img src={flowers} alt="" className="card-img-top img-fluid" />
                    <div className="card-body text-center">
                    <img src={ryPFP} alt="img" width="150px" height="150px" className="rounded-circle mt-n5" />
                    <h5 className="card-title">Ryyyy</h5>
                    <p className="card-text text-justify mb-2">I wish I was a little bit taller, wish I was a baller, wish I had a girl… also.</p>
                    <ul className="list-unstyled nav justify-content-center">
                        <a href="#" className="text-dark text-decoration-none">
                        <li className="nav-item">Friends <br /> <strong>12M</strong></li>
                        </a>
                        <a href="#" className="text-dark text-decoration-none">
                        <li className="nav-item">Enemies <br /> <strong>1</strong></li>
                        </a>
                    </ul>
                    </div>
                </div>
            
                <div className="card shadow-sm card-left2 mb-4">
                    <div className="card-body">
                            <h5 className="mb-3 card-title">About <small><a href="#" className="ml-1">Edit</a></small></h5>
                            <p className="card-text"> <i className="fas fa-calendar-week mr-2"></i> Went to <a href="#" className="text-decoration-none">oh canada</a></p>
                            <p className="card-text"> <i className="fas fa-user-friends mr-2"></i> Become a friend with <a href="#" className="text-decoration-none">obama</a></p>
                            <p className="card-text"> <i className="far fa-building mr-2"></i> Work at <a href="#" className="text-decoration-none">Github</a></p>
                            <p className="card-text"> <i className="fas fa-home mr-2"></i> Live in <a href="#" className="text-decoration-none">San francisco</a></p>
                            <p className="card-text"> <i className="fas fa-map-marker mr-2"></i> From <a href="#" className="text-decoration-none">Seattle, WA</a></p>
                    </div>
                </div>
            </div>
            <style>{scrollbarStyles}</style>
        </div>
    </div>
  )
}
