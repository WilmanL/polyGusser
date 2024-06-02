//  frontend/src/navigation/Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark mb-4" style={{backgroundColor:"#3097D1"}}>
                <Link to="/polygusser/home" className="navbar-brand">polyguesser</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link to="/polygusser/messages" className="nav-link active">messages</Link></li>
                        <li className="nav-item"><Link to="/polygusser/contextoGame" className="nav-link active">ContextoGame</Link></li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><Link to="/polygusser/login" className="nav-link">Login</Link></li>
                        <li className="nav-item"><Link to="/polygusser/signup" className="nav-link">Sign Up</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
