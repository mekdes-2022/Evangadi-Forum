// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios';
// import {Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../context/UserContext';

// const Login = () => {
//     const [userData, setUserData] = useContext(UserContext);
//     const navigate = useNavigate();
//     const [form, setForm] = useState({});

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const loginRes = await axios.post('http://localhost:5000/api/users/login', {
//                 email: form.email,
//                 password:form.password
//             })
//             setUserData({
//                 token: loginRes.data.token,
//                 user: loginRes.data.user
//             });
//             localStorage.setItem('auth-token', loginRes.data.token);
//             navigate('/');
//         } catch (err) {
//             console.log('problem', err.response.data.msg);
//             alert(err.response.data.msg);
//         }
//     }
//     useEffect(() => {
//         if (userData.user) navigate('/');
//     },[userData.user,navigate]);
    
//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//               <input type="text"
//                   name="email"
//                   onChange={handleChange} /> <br />
//         <label>password:</label>
//               <input type="password"
//                   name="password"
//                   onChange={handleChange} /> <br />
//               <button>submit</button>
//           </form>
//           <Link to='/signup'> Create a new account </Link>
//     </div>
//   );
// }

// export default Login


import axios from "axios";
import "./Login.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Login() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      const loginRes = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      //update global state with response from backend(user-info)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate user to homepage
      navigate("/");
    } catch (err) {
      // if the email isnot reegistered in the database the backend respond 404 with message so to show that message to the frontend we use the path err.response.data.msg
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);

  return (
    <div>
      <div className="login">
        <div className="login__container">
          <div className="login__title">
            <h2>Login to your account</h2>
            <p>
              Don't have an account?{" "}
              <Link className="account__link" to="/signup">
                Create a new account
              </Link>
            </p>

            <form className="login__form" onSubmit={handleSubmit}>
              {/* <label>Email</label> */}
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
              />{" "}
              <br />
              {/* <label>Password</label> */}
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                onChange={handleChange}
              />
              <br />
              <button>Submit</button>
            </form>
            <Link className="account__link" to="/signup">
              Create an Account?
            </Link>
          </div>
        </div>

        <div className="login__about">
          <p id="about">About</p>
          <h1>Evangadi Networks Q&A</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            molestias! Expedita ex nostrum officia harum quos numquam pariatur
            quas sequi nulla itaque molestias ullam fugit aut voluptatem at,
            laudantium reprehenderit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            porro quidem maxime in nostrum asperiores quos totam quia, molestias
            facere, consectetur dolores quod soluta aspernatur obcaecati, ipsam
            mollitia? Assumenda, fugiat?
          </p>{" "}
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            obcaecati corporis a reiciendis vitae repellat. Repellendus
            voluptatum et sapiente possimus, reiciendis, necessitatibus voluptas
            laudantium accusamus totam eligendi consectetur dolorem quae.
          </p>
          <button>HOW IT WORKS</button>
        </div>
      </div>

      <div className="footer">
        <div>
          <img
            className="footer__image"
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png"
            alt=""
          />
          <div className="footer_socialLink">
            <span>
              <a href="">facebook</a>
            </span>
            <span className="footer__instagram">
              <a href="">insta</a>
            </span>
            <span>
              <a href="">youtube</a>
            </span>
          </div>
        </div>

        <div className="footer__linkList">
          <div className="footer__linkUseful">
            <h3>Useful Link</h3>
            <ul>
              <li>How it works</li>
              <li>Terms of Service</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="footer__linkContact">
            <h3>Contact Info</h3>
            <ul>
              <li>Evangadi Networks</li>
              <li>support@evangadi.com</li>
              <li>+1-202-386-2702</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
