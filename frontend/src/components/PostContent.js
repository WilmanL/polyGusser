import React from 'react'
import MainCardCommentsComponent from './MainCardCommentsComponent';
import testImage from '../assests/EmiPFP.jpg';
import sleepyNala1 from '../assests/SleepyNala1.jpg';
import sleepyNala2 from '../assests/SleepyNala2.jpg';
import NalaUp from '../assests/NalaUp.jpg';
import NalaDoor from '../assests/NalaDoor.jpg';

export default function PostContent() {
  return (
    <div className="card-body">
        <div className="media">
            <img src={testImage} alt="img" width="55px" height="55px" className="rounded-circle mr-3" />
            <div className="media-body">
                <h5>Emi R.</h5>
                <p className="card-text text-justify">Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                
                <div className="row no-gutters mb-3">
                    <div className="col-6 p-1 text-center">
                    <img src={sleepyNala1} alt="" className="img-fluid mb-2" />
                    <img src={sleepyNala2} alt="" className="img-fluid" />
                    </div>
                    <div className="col-6 p-1 text-center">
                    <img src={NalaDoor} alt="" className="img-fluid mb-2" />
                    <img src={NalaUp} alt="" className="img-fluid" />
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
