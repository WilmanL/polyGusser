//  frontend/src/pages/authentication.js

import React, { useState } from 'react';

const API_PREFIX = "http://localhost:5000/polyguesser";

export function loginUser(creds) {
    return fetch(`${API_PREFIX}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(payload => {
                localStorage.setItem('token', payload.token);
                return payload;
            });
        } else {
            return response.json().then(data => {
                throw new Error(`Login Error ${response.status}: ${data.message}`);
            });
        }
    });
}

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
