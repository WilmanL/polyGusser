import React, { useState } from 'react';
import AuthContext from './AuthContext';

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState({ token: null, userId: null, userName: '' });

  const setTokens = (data) => {
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
}