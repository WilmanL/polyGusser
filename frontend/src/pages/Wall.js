import React, { useContext } from 'react';
import LeftWallComponent from '../components/LeftWallComponent';
import MiddleWallComponent from '../components/MiddleWallComponent';
import RightWallComponent from '../components/RightWallComponent';
import AuthContext from '../components/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Wall() {
  const { authTokens } = useContext(AuthContext)
  if (authTokens.userId === null) {
    return <Navigate to="/polyguesser/login" />;
}
  return (
    <div className="container">
      <div className="row">
        <LeftWallComponent/>
        <MiddleWallComponent/>
        <RightWallComponent/>

      </div>
    </div>
  );
}
