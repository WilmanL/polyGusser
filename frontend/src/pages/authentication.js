import React from 'react';
import { useEffect, useState } from 'react';
import { scrollbarStyles } from '../customStyles/scrollBarStyles';
import LeftWallComponent from '../components/LeftWallComponent';
import RightWallComponent from '../components/RightWallComponent';
import NewPostComponent from '../components/NewPostComponent';
import FillBar from '../components/Fillbar';

// const INVALID_TOKEN = "INVALID_TOKEN";
// const [token, setToken] = useState(INVALID_TOKEN);
// const [message, setMessage] = useState("");

const API_PREFIX = "http://localhost:5000/polyguesser";
let token = null; // To store the token
let setMessage = console.log; // Default message handler, replace with your message handling logic

export function loginUser(creds) {
  return fetch(`${API_PREFIX}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((payload) => {
          token = payload.token;
          setMessage(`Login successful; auth token saved`);
        });
      } else {
        response.json().then((data) => {
          setMessage(`Login Error ${response.status}: ${data}`);
        });
      }
    })
    .catch((error) => {
      setMessage(`Login Error: ${error}`);
    });
}

export function fetchUsers() {
  return fetch(`${API_PREFIX}/users`, {
    headers: addAuthHeader()
  });
}

export function addAuthHeader(otherHeaders = {}) {
  if (token === null) {
    return otherHeaders;
  } else {
    return {
      ...otherHeaders,
      Authorization: `Bearer ${token}`
    };
  }
}

export function signupUser(creds) {
  return fetch(`${API_PREFIX}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json().then((payload) => {
          token = payload.token;
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        });
      } else {
        setMessage(
          `Signup Error ${response.status}: ${response.data}`
        );
      }
    })
    .catch((error) => {
      setMessage(`Signup Error: ${error}`);
    });
}