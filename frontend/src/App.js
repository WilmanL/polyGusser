import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Messages from "./pages/Messages";
import Wall from "./pages/Wall";
import Navigation from "./navigation/Navigation";
import ContextoGame from "./pages/ContextoGame";
import { loginUser, signupUser } from "./pages/authentication";
import Login from "./pages/login";

function App() {
    const [message, setMessage] = useState("");

    return (
        <div className="App" style={{overflow: 'hidden'}}>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/polygusser/login" element={<Login handleSubmit={loginUser} buttonLabel="Log In" />} />
                    <Route path="/polygusser/signup" element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />} />
                    <Route path="/polygusser/home" element={<ProtectedRoute component={Wall} />} />
                    <Route path="/polygusser/contextoGame" element={<ProtectedRoute component={ContextoGame} />} />
                    <Route path="/*" element={<Navigate to="/polygusser/login" />} />
                </Routes>
                <Routes>
                    <Route path="/polygusser/messages" element={<ProtectedRoute component={Messages} />} />
                </Routes>
            </Router>
        </div>
    );
}

function ProtectedRoute({ component: Component, ...rest }) {
    const token = localStorage.getItem('token');
    return token ? <Component {...rest} /> : <Navigate to="/polygusser/login" />;
}

export default App;
