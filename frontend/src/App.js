import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wall from "./pages/Wall";
import Navigation from "./navigation/Navigation";
import ContextoGame from "./pages/ContextoGame";
// import Auth from "./pages/Auth";
// import Register from "./pages/Register";

function App() {
  return (
    // <AuthProvider authType={'cookie'}>
      <div className="App" style={{overflow: 'hidden'}}>
        <Router>
          <Navigation/>
          <Routes>
            <Route path="/polyguesser/home" element={<Wall/>} />
            <Route path="/polyguesser/contextoGame" element={<ContextoGame/>} />
            {/* <Route path="/polyguesser/login" element={<Auth/>} /> */}
            {/* <Route path="/polyguesser/Register" element={<Register/>} /> */}
            <Route path="/*"  element={<Wall/>} />
          </Routes>
        </Router>
      </div>
    // </AuthProvider>
  );
}

export default App;