import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Messages from "./pages/Messages";
import Wall from "./pages/Wall";
import Navigation from "./navigation/Navigation";
import ContextoGame from "./pages/ContextoGame";

function App() {
  return (
    <div className="App" style={{overflow: 'hidden'}}>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/polygusser/home" element={<Wall/>} />
          <Route path="/polygusser/contextoGame" element={<ContextoGame/>} />
          <Route path="/*" element={<Wall/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;