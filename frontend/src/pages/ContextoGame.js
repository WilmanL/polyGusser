import React from 'react';
import { useEffect, useState } from 'react';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';
import LeftWallComponent from '../components/LeftWallComponent';
import RightWallComponent from '../components/RightWallComponent';
import NewPostComponent from '../components/NewPostComponent';
import FillBar from '../components/Fillbar';

export default function ContextoGame() {
    // component mounted state information
    const [document_today, setDocumentToday] = useState([]);
    const [guess_word, setGuessWord] = useState('');
    const [maxGuessNumber, setMaxGuessNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    //temp hardcoded vars for development - need to change these later
    const user_id = 'saumitra26';

    // component mounted
    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/polygusser/contexto?user_id=${user_id}`)
            .then(response => response.json()) // parse the JSON from the body of the response
            .then(data => {
                console.log(data);
                setDocumentToday(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    //document today is being updated
    useEffect(() => {
        if (document_today.length > 0) {
            const maxGuess = Math.max(...document_today.map(doc => doc.guess_number));
            setMaxGuessNumber(maxGuess);
        }
    }, [document_today]);

    //fetch the data when the guess_word changes
    useEffect(() => {
        if (guess_word) {
            setIsLoading(true);
            fetch(`http://localhost:5000/polygusser/contexto?guess_word=${guess_word}&user_id=${user_id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setDocumentToday(data);
                    setIsLoading(false);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [guess_word]);

    //handle the send button click
    const handleSend = (value) => {
        setGuessWord(value);
    };

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
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0077B6' }}>
                            GUESSES: <span style={{ fontWeight: 900 }}>{maxGuessNumber}</span>
                        </div>
                        <div className="card scrollBar" style={{ overflow: 'auto', overflowX: 'hidden', maxHeight: '100vh' }}>
                        <div style={{ paddingRight: '10px', marginRight: '-10px' }}>
                            <NewPostComponent placeholder='type a word' guess_word = {guess_word} 
                            handleSend = {handleSend}/>
                        </div>
                        {document_today.sort((a, b) => b.guess_number - a.guess_number).map((doc, index) => {
                            if(doc.similarity < 0){
                                doc.similarity = 0.0045;
                            }
                            return (<FillBar key={index} value={doc.similarity * 100} maxValue={100 * 1.00} wordValue={doc.guess_word}/>)
                        })}
                        <style>{scrollbarStyles}</style>
                        </div>
                    </div>
                </div>
            <RightWallComponent/>
        </div>
    </div>
  );
}
