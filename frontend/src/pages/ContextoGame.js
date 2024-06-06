import React from 'react';
import { useEffect, useState } from 'react';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';
import LeftWallComponent from '../components/LeftWallComponent';
import RightWallComponent from '../components/RightWallComponent';
import Wordle from '../components/Wordle';
import WordleResult from '../components/WordleResult';

export default function ContextoGame() {
    // component mounted state information
    const [document_today, setDocumentToday] = useState([]);
    const [gameDoc, setGameDoc] = useState({});
    const [guess_word, setGuessWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //temp hardcoded vars for development - need to change these later
    const user_id = 'dhruv26';

    // component mounted
    useEffect(() => {
        setIsLoading(true);
        fetch(`http://3.145.19.247:5000/polygusser/contexto?user_id=${user_id}`)
            .then(response => response.json()) // parse the JSON from the body of the response
            .then(data => {
                console.log(data);
                setGameDoc(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    //fetch the data when the guess_word changes
    useEffect(() => {
        if (guess_word) {
            setIsLoading(true);
            fetch(`http://3.145.19.247:5000/polygusser/contexto?guess_word=${guess_word}&user_id=${user_id}`)
                .then(response => response.json())
                .then(data => {
                    setGameDoc(data);
                    console.log(data);
                    setIsLoading(false);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [guess_word]);

    //update the document today
    useEffect(() => {
        if (gameDoc.similarity) {
            setDocumentToday(gameDoc.similarity);
        }
    }, [gameDoc]);

  return (
    <div className="container">
        {isLoading ? (
            <div className="modal fade show" style={{display: 'block', paddingRight: '17px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}} aria-modal="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">Loading...</div>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null}
        <div className="row">
            <LeftWallComponent/>
                <div className="col-12 col-lg-6">
                    <div className="middle-column">
                        <div className="card scrollBar" style={{ overflow: 'auto', overflowX: 'hidden', maxHeight: '100vh' }}>
                            {/* <WordleResult /> */}
                        {
                            (gameDoc.guessed === true || gameDoc.guessNumber >= 6) 
                            ? <WordleResult user_id = {user_id}/>
                            : <Wordle document_today={document_today} setGuessWord={setGuessWord}/>
                        }
                            <style>{scrollbarStyles}</style>
                        </div>
                    </div>
                </div>
            <RightWallComponent gameDoc = {gameDoc}/>
        </div>
    </div>
  );
}
