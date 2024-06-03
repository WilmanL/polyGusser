//  frontend/src/pages/ContextoGame.js

import React from 'react';
import { useEffect, useState } from 'react';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';
import LeftWallComponent from '../components/LeftWallComponent';
import RightWallComponent from '../components/RightWallComponent';
import Wordle from '../components/Wordle';

export default function ContextoGame() {
    // component mounted state information
    const [document_today, setDocumentToday] = useState([]);
    const [guess_word, setGuessWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user_id, setUserId] = useState(null); // Initialize user ID state

    useEffect(() => {
        setIsLoading(true);
        // Fetch user ID from authentication token (e.g., localStorage, cookies, etc.)
        const storedUserId = localStorage.getItem('user_id'); // Example: Retrieve user ID from localStorage
        if (storedUserId) {
            setUserId(storedUserId); // Set user ID state
            // Fetch data using user ID
            fetch(`http://localhost:5000/polygusser/contexto?user_id=${storedUserId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in request headers
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDocumentToday(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error:', error));
        } else {
            setIsLoading(false); // If user ID is not found, stop loading
        }
    }, []); // Fetch data when component mounts

    //fetch the data when the guess_word changes
    useEffect(() => {
        if (guess_word && user_id) { // Check if user ID is available before fetching data
            setIsLoading(true);
            fetch(`http://localhost:5000/polygusser/contexto?guess_word=${guess_word}&user_id=${user_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include token in request headers
                }
            })
            .then(response => response.json())
            .then(data => {
                setDocumentToday(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error:', error));
        }
    }, [guess_word, user_id]); // Fetch data when guess_word or user_id changes

    // Function to handle guess submission when Enter key is pressed
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            submitGuess();
        }
    };

    // Function to submit guess
    const submitGuess = () => {
        // Your logic for submitting the guess goes here
        console.log('Guess submitted:', guess_word);
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
                            <div className="card scrollBar" style={{ overflow: 'auto', overflowX: 'hidden', maxHeight: '100vh' }}>
                                <Wordle document_today={document_today} setGuessWord={setGuessWord}/>
                                <style>{scrollbarStyles}</style>
                            </div>
                        </div>
                    </div>
                <RightWallComponent/>
            </div>
        </div>
    );
}
