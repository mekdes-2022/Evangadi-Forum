import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const [userData, setUserData] = useContext(UserContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.targer.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginRes = await axios.post('http//localhost:4000/api/users/login', {
                email: form.email,
                password:form.password
            })
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem('auth-token', loginRes.data.token);
            navigate('/');
        } catch (err) {
            console.log('problem', err.response.data.msg);
            alert(err.response.data.msg);
        }
    }
    useEffect(() => {
        if (userData.use) navigate('/');
    },[userData.user,navigate]);
    
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
              <input type="text"
                  name="email"
                  onChange={handleChange} /> <br />
        <label>password:</label>
              <input type="password"
                  name="password"
                  onChange={handleChange} /> <br />
              <button>submit</button>
          </form>
          <Link to='/signup'> Create a new account </Link>
    </div>
  );
}

export default Login