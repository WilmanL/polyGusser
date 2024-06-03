import React from 'react'
import SponsorComponent from './SponsorComponent';
import FooterComponent from './FooterComponent';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';

export default function RightWallComponent({gameDoc}) {
  return (
    <div className="col-12 col-lg-3">
        <div className="right-column scrollBar" style={{ overflow: 'auto',overflowX: 'hidden', maxHeight: '100vh' }}>
          <div style={{ paddingRight: '10px', marginRight: '-10px' }}>
            <SponsorComponent gameDoc = {gameDoc}/>
            <FooterComponent/>
          </div>
          <style>{scrollbarStyles}</style>
        </div>
    </div>
  )
}
