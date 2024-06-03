// frontend/src/pages/signup.js

import React, { useState } from 'react';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/polyguesser/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, passwordConfirmation }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user_id', data.user_id); // Save user_id
                localStorage.setItem('token', data.access_token); // Save token
                window.location.href = '/polygusser/contextoGame'; // Redirect to game
            } else {
                setError(data.error || 'Signup failed');
            }
        } catch (error) {
            setError('Signup failed');
            console.error('Error:', error);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">Confirm Password:</label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}
