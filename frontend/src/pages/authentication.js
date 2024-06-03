//  frontend/src/pages/authentication.js

import React, { useState } from 'react';

const API_PREFIX = "http://localhost:5000/polyguesser";

export const login = async (username, password) => {
    try {
        const response = await fetch('http://localhost:5000/polyguesser/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user_id', data.user_id); // Save user_id
            localStorage.setItem('token', data.token); // Save token
            // Redirect to game or set state to indicate user is logged in
        } else {
            console.error('Login failed:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
export function signupUser(creds) {
    return fetch(`${API_PREFIX}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.status === 201) {
            return response.json().then(payload => {
                return payload;
            });
        } else {
            return response.json().then(data => {
                throw new Error(`Signup Error ${response.status}: ${data.message}`);
            });
        }
    });
}

export function addAuthHeader(otherHeaders = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
        return otherHeaders;
    } else {
        return {
            ...otherHeaders,
            Authorization: `Bearer ${token}`
        };
    }
}

export function fetchUsers() {
    return fetch(`${API_PREFIX}/users`, {
        headers: addAuthHeader()
    });
}
