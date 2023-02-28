import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.targer.value });
  };
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       await axios.post(
         "http//localhost:4000/api/users", form);
       const loginRes = await axios.post('http://localhost:4000/api/users/login', {
         email: form.email,
         password: form.password,
       });
         
       setUserData({
         token: loginRes.data.token,
         user: loginRes.data.user,
       });
       localStorage.setItem("auth-token", loginRes.data.token);
       navigate("/");
     } catch (err) {
       console.log("problem===>", err.response.data.msg);
       
     }
   };
  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" onChange={handleChange} /> <br />
        <label>Last Name:</label>
        <input type="text" name="LastName" onChange={handleChange} />
        <br />
        <label>User Name:</label>
        <input type="text" name="UserName" onChange={handleChange} /> <br />
        <label>Email:</label>
        <input type="text" name="email" onChange={handleChange} /> <br />
        <label>password:</label>
        <input type="password" name="password" onChange={handleChange} /> <br />
        <button>submit</button>
      </form>
      <Link to="/login">Already have an account</Link>
    </div>
  );
}

export default SignUp