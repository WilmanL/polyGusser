import React from 'react'
import MainCardCommentsComponent from './MainCardCommentsComponent';
import testImage from '../assests/test.jpg';

export default function PostContent() {
  return (
    <div className="card-body">
        <div className="media">
            <img src={'https://picsum.photos/800/1000'} alt="img" width="55px" height="55px" className="rounded-circle mr-3" />
            <div className="media-body">
                <h5>Saumitra Tiwari</h5>
                <p className="card-text text-justify">Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                
                <div className="row no-gutters mb-3">
                    <div className="col-6 p-1 text-center">
                    <img src={'https://picsum.photos/800/1000'} alt="" className="img-fluid mb-2" />
                    <img src={'https://picsum.photos/800/1000'} alt="" className="img-fluid" />
                    </div>
                    <div className="col-6 p-1 text-center">
                    <img src={'https://picsum.photos/800/1000'} alt="" className="img-fluid mb-2" />
                    <img src={'https://picsum.photos/800/1000'} alt="" className="img-fluid" />
                    </div>
                </div>
                
                <MainCardCommentsComponent/>
                
            </div>
            {/* posted time shown */}
            <small>5min</small>
        </div>
    </div>
  )
}
