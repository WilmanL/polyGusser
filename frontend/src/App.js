import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wall from "./pages/Wall";
import Navigation from "./navigation/Navigation";
import ContextoGame from "./pages/ContextoGame";
import { AuthProvider } from "./components/AuthProvider";
import Auth from "./pages/Auth";
import Register from "./pages/Register";

function App() {
  return (
      <AuthProvider>
        <div className="App" style={{overflow: 'hidden'}}>
          <Router>
            <Navigation/>
            <Routes>
              <Route path="/polygusser/home" element={<Wall/>} />
              <Route path="/polygusser/contextoGame" element={<ContextoGame/>} />
              <Route path="/polygusser/login" element={<Auth/>} />
              <Route path="/polygusser/register" element={<Register/>} />
              <Route path="/*" element={<Wall/>} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
  );
}

export default App;