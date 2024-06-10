import React from 'react'
import testImage from '../assests/test.jpg';

export default function ModalMessage() {
  return (
    <>
        <li className="media hover-media">
            <img src={'https://picsum.photos/800/1000'} onError={(e)=>{e.target.onerror = null; e.target.src=testImage}} alt="img" width="60px" height="60px" className="rounded-circle mr-3"/>
            <div className="media-body text-dark">
                <h6 className="media-header">Jchob Thunder and <strong> 1 others</strong></h6>
                <p className="media-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </li>
        <hr className="my-3"/>
    </>
  )
}