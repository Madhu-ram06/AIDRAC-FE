import Navbar from './Navbar';
import Home from './Home';
import Upload from './Upload';
import Aadhaar from './Aadhaar';
import UserContext from "./UserContext";
import Logout from './LogOut';
import Login from './Login1';
import Register from './Register';
import AboutUs from './AboutUs';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [userID, setUserID] = useState('');
  const isLoggedIn = userID !== '';

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ userID, setUserID }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aadhaar" element={<Aadhaar />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Home /> : <Login />}
            />
            {/* Add any other routes you need */}
            <Route path="/" element={<Home />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;