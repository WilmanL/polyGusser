import React, {useState} from "react";
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
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {

  const [ready, setReady] = useState(false);

  return (
    <div className="App" style={{overflow: 'hidden'}}>
      <Router>
        {ready && <Navigation/>}
        <Routes>
          <Route path="/polyguesser/home" element={<Wall/>} />
          <Route path="/polyguesser/contextoGame" element={<ContextoGame/>} />
          <Route path="/polyguesser/login" element={<Auth setReady = {setReady}/>} />
          <Route path="/polyguesser/register" element={<Register/>} />
          <Route path="/*" element={<Auth/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;