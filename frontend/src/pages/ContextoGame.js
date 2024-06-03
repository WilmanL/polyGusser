import React, { useEffect, useState } from 'react';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';
import LeftWallComponent from '../components/LeftWallComponent';
import RightWallComponent from '../components/RightWallComponent';
import Wordle from '../components/Wordle';

export default function ContextoGame() {
    const [document_today, setDocumentToday] = useState([]);
    const [gameDoc, setGameDoc] = useState({});
    const [guess_word, setGuessWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user_id, setUserId] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id'); // Adjust based on your storage method
        const storedToken = localStorage.getItem('token'); // Adjust based on your storage method
        if (storedUserId && storedToken) {
            setUserId(storedUserId);
            setToken(storedToken);
        } else {
            console.error('User not authenticated');
        }
    }, []);

    useEffect(() => {
        if (user_id && token) {
            setIsLoading(true);
            fetch(`http://localhost:5000/polyguesser/contexto?user_id=${user_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setGameDoc(data);
                    setIsLoading(false);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [user_id, token]);

    useEffect(() => {
        if (guess_word && user_id && token) {
            setIsLoading(true);
            fetch(`http://localhost:5000/polyguesser/contexto?guess_word=${guess_word}&user_id=${user_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setGameDoc(data);
                    console.log(data);
                    setIsLoading(false);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [guess_word, user_id, token]);

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
                            {
                                (gameDoc.guessed === true || gameDoc.guessNumber >= 6) 
                                ? <div>Game Over! Display your result here.</div>
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
