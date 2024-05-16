import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Messages from "./pages/Messages";
import Wall from "./pages/Wall";
import Navigation from "./navigation/Navigation";
import ContextoGame from "./pages/ContextoGame";
import "./pages/authentication"
import "./pages/login"

function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  
  return (
    <div className="App" style={{overflow: 'hidden'}}>
      <Router>
        <Routes>
          <Route path="/polygusser/login" element={<Login handleSubmit={loginUser}/>}/>
        </Routes>
        <Navigation/>
        <Routes>
          <Route path="/polygusser/home" element={<Wall/>} />
          <Route path="/polygusser/contextoGame" element={<ContextoGame/>} />
          <Route path="/*" element={<Wall/>} />
        </Routes>
        <Routes>
          <Route path="/polygusser/messages" element={<Messages/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;