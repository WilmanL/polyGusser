import React from 'react'
import testImage from '../assests/WilPFP.jpg';
//import flowers from '../assests/flowerField.jpg';

export default function MainCardCommentsComponent() {
  return (
    <div className="media mb-3">
        <img src={testImage} alt="img" width="45px" height="45px" className="rounded-circle mr-2" />
        <div className="media-body">
        <h5>Wil: </h5><p className="card-text text-justify">Jacon Thornton: Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.</p>
        </div>
    </div>
  )
}
