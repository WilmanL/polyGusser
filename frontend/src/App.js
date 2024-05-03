import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Messages from "./pages/Messages";
import Wall from "./pages/Wall";
import Navigation from "./navigation/Navigation";
import ContextoGame from "./pages/ContextoGame";

function App() {
  return (
    <div className="App" style={{overflow: 'hidden'}}>
    
      <Router>
        <Navigation/>
      </Router>
      
      {/* <Wall/> */}
      <ContextoGame/>
    </div>
  );
}

export default App;
