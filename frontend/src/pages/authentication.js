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

  export function loginUser(creds) {
    const promise = fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  
    return promise;
  }

  export function fetchUsers() {
    const promise = fetch(`${API_PREFIX}/users`, {
      headers: addAuthHeader()
    });
  
    return promise;
  }

  export const promise = fetch(`${API_PREFIX}/users`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(person)
  });

  export function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  export function signupUser(creds) {
    const promise = fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });
  
    return promise;
  }