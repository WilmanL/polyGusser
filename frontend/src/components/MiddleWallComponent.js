import React from 'react';
import NewPostComponent from './NewPostComponent';
import PostContent from './PostContent';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';

export default function MiddleWallComponent() {
  return (
    <div className="col-12 col-lg-6">
      <div className="middle-column">
        <div className="card scrollBar" style={{ overflow: 'auto', overflowX: 'hidden', maxHeight: '100vh' }}>
          <div style={{ paddingRight: '10px', marginRight: '-10px' }}>
            <NewPostComponent placeholder='New Message'/>
            <PostContent />
            <PostContent />
            <PostContent />
            <PostContent />
          </div>
          <style>{scrollbarStyles}</style>
        </div>
      </div>
    </div>
  );
}
