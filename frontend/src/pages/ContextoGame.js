import React from 'react';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';
import LeftWallComponent from '../components/LeftWallComponent';
import RightWallComponent from '../components/RightWallComponent';
import NewPostComponent from '../components/NewPostComponent';
import FillBar from '../components/Fillbar';

export default function ContextoGame() {
    const errorMessage = 'you fucked up!!';
  return (
    <div className="container">
        <div className="row">
            <LeftWallComponent/>
                <div className="col-12 col-lg-6">
                    <div className="middle-column">
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0077B6' }}>
                            GUESSES: <span style={{ fontWeight: 900 }}>7</span>
                        </div>
                        <div className="card scrollBar" style={{ overflow: 'auto', overflowX: 'hidden', maxHeight: '100vh' }}>
                        <div style={{ paddingRight: '10px', marginRight: '-10px' }}>
                            <NewPostComponent placeholder='type a word'/>
                        </div>
                        <FillBar value = {80} maxValue={100} wordValue={'hey man'}/>
                        <style>{scrollbarStyles}</style>
                        </div>
                    </div>
                </div>
            <RightWallComponent/>
        </div>
    </div>
  );
}
