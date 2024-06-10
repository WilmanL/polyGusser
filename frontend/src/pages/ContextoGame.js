import React, { useEffect, useState, useContext } from 'react';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';
import LeftWallComponent from '../components/LeftWallComponent';
import RightWallComponent from '../components/RightWallComponent';
import Wordle from '../components/Wordle';
import WordleResult from '../components/WordleResult';
import AuthContext from '../components/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ContextoGame() {
    const [document_today, setDocumentToday] = useState([]);
    const [gameDoc, setGameDoc] = useState({});
    const [guess_word, setGuessWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Get auth context
    const { authTokens, setTokens } = useContext(AuthContext);


    useEffect(() => {
        console.log('Auth tokens:', authTokens); // Debug log
        setIsLoading(true);
        fetch(`http://3.145.19.247:5000/polyguesser/contexto?user_id=${authTokens.userId}&user_name=${authTokens.userName}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGameDoc(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, [authTokens.userId]);

    useEffect(() => {
        if (guess_word) {
            setIsLoading(true);
            fetch(`http://3.145.19.247:5000/polyguesser/contexto?guess_word=${guess_word}&user_id=${authTokens.userId}`)
                .then(response => response.json())
                .then(data => {
                    setGameDoc(data);
                    console.log(data);
                    setIsLoading(false);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [guess_word, authTokens.userId]);

    useEffect(() => {
        if (gameDoc.similarity) {
            setDocumentToday(gameDoc.similarity);
        }
    }, [gameDoc]);

    if (authTokens.userId === null) {
        return <Navigate to="/polyguesser/login" />;
    }

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
                            {
                                (gameDoc.guessed === true || gameDoc.guessNumber >= 6) 
                                ? <WordleResult user_id={authTokens.userId}/>
                                : <Wordle document_today={document_today} setGuessWord={setGuessWord}/>
                            }
                            <style>{scrollbarStyles}</style>
                        </div>
                    </div>
                </div>
                <RightWallComponent gameDoc={gameDoc}/>
            </div>
        </div>
    );
}
