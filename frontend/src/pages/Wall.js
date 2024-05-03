import React from 'react';
import LeftWallComponent from '../components/LeftWallComponent';
import MiddleWallComponent from '../components/MiddleWallComponent';
import RightWallComponent from '../components/RightWallComponent';

export default function Wall() {
  return (
    <div className="container">
      <div className="row">
        <LeftWallComponent/>
        <MiddleWallComponent/>
        <RightWallComponent/>

      </div>
    </div>
  );
}
