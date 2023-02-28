
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import axios from "axios";
import {BrowserRouter as Router, Routes, Route}from 'react-router-dom'
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import SignUp from "./pages/SignUp/SignUp"

function App() {
  const [userData, setUserData] = useContext(UserContext);
  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token');
    if (token === null) {
      localStorage.setItem('auth-token', '');
      token = '';
    } else {
      const userRes = await axios.get('http://localhost:4000/api/users', {
        header: { 'x-auth-token': token }
      });
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name:userRes.data.data.user_name
        }
      })
    }
  }
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '')
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home logout={logout} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
