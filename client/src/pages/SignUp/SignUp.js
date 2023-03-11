//   import React, { useContext, useState } from 'react'
//   import { Link, useNavigate } from 'react-router-dom';
//   import { UserContext } from '../../context/UserContext';
//   import axios from "axios";
// import "./SignUp.css";

//   const SignUp = () => {
//     const [form, setForm] = useState({});
//     const navigate = useNavigate();
//     const [userData, setUserData] = useContext(UserContext);

//     const handleChange = (e) => {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     };
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         await axios.post("http://localhost:5000/api/users", form);
          
//         const loginRes = await axios.post('http://localhost:5000/api/users/login', {
//           email: form.email,
//           password: form.password,
//         });
          
//         setUserData({
//           token: loginRes.data.token,
//           user: loginRes.data.user,
//         });
//         localStorage.setItem("auth-token", loginRes.data.token);
//         navigate("/");
//       } catch (err) {
//         console.log("problem===>", err.response.data.msg);
        
//       }
//     };
//     return (
//       <div className="container">
//         <div className="header-wraper">
//           <div className="header-logo ">
//             <img
//               className="checkout__ad"
//               src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
//               alt=""
//             />
//           </div>
//           <div className="header-text">
//             <h5 className="header-title">Home</h5>
//             <h5>How it Works</h5>
//           </div>
//           <div>
//             <button className="header-signIn">sign in</button>
//           </div>
//         </div>

//         <br></br>
//         <div className="row-wrapper">
//           <div className="row-container-left">
//             <form className="form" onSubmit={handleSubmit}>
//               <h1 className="form-title ">Join the network</h1>
//               <div className="link">
//                 <Link to="/login">Already have an account? signIn</Link>
//               </div>

//               <input
//                 className="inputContainer"
//                 type="text "
//                 placeholder="Email"
//                 name="email"
//                 onChange={handleChange}
//               />
//               <br />
//               <div className="input-name">
//                 <div className="input-name-left">
//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     name="firstName"
//                     className="inputContainer"
//                     onChange={handleChange}
//                   />
//                   <br />
//                 </div>
//                 <div className="input-name-right">
//                   <input
//                     className="inputContainer"
//                     type="text"
//                     placeholder="Last Name"
//                     name="LastName"
//                     onChange={handleChange}
//                   />
//                   <br />
//                 </div>
//               </div>
//               <input
//                 className="inputContainer"
//                 type="text"
//                 placeholder="User Name"
//                 name="UserName"
//                 onChange={handleChange}
//               />
//               <br />

//               <input
//                 className="inputContainer"
//                 type="password"
//                 placeholder="password"
//                 name="password"
//                 onChange={handleChange}
//               />
//               <br />
//               <button className="button">Agree and Join</button>
//               <div className="terms-service-wraper">
//                 <h5>I agree to the privacyPolicy and term of service</h5>
//               </div>
//               <div className="link">
//                 <Link to="/login">Already have an account?</Link>
//               </div>
//             </form>
//           </div>
//           <div className="row-container-right">
//             <h3 className="about">About</h3>
//             <br />
//             <hl className="rightside-title">Evangadi Networks Q & A </hl>
//             <br /> <br />
//             <p>
//               No matter what stage of life you are in, whether you’re just
//               starting elementary  school or being promoted to CEO of a
//               Fortune 500 company, you have much to
//                offer to those who are trying to follow in your footsteps.
//               Wheather you are willing
//                to share your knowledge or you are just looking to meet
//               mentors of your own,  please start by joining the network
//               here.
//               <br />
            
//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
//                 mollitia, molestiae quas vel sint commodi repudiandae
//                 consequuntur voluptatum laborum numquam blanditiis harum
//                 quisquam eius sed odit fugiat iusto fuga praesentium optio,
//                 eaque rerum! Provident similique accusantium nemo autem.
//               </p>
              
//             </p>
//             <br></br>
//             <div>
//               <button className="rightside-button">How it Works</button>
//             </div>
//           </div>
//         </div>
//         <div className="footer-wrapper">
//           <div className="footer-logo ">
//             <img
//               className="checkout__ad"
//               src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
//               alt=""
//             />
//           </div>
//           <div className="footer-link">
//             <h1> Useful Link </h1>
//             <ul>
//               <li>How it Works</li>
//               <li>Terms of Service</li>
//               <li>Privacy policy</li>
//             </ul>
//           </div>
//           <div className="footer-link">
//             <h1> Contact info </h1>
//             <ul>
//               <li>Evangadi Networks</li>
//               <li>Support@evangadi.com</li>
//               <li>000-000-000</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   export default SignUp


import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./SignUp.css";

function SignUp() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registered in database
      await axios.post("http://localhost:5000/api/users", form);

      //once registered the login automatically so send the new user info to be logged in
      const loginRes = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // set the global state with the new user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
      alert(error.response.data.msg);
    }
  };
  return (
    <div>
      <div className="signup">
        <div className="signup__container">
          <div className="signup__title">
            <h2>Join the network</h2>
            <p>
              Already have an account?{" "}
              <Link className="account__link" to="/login">
                Sign in
              </Link>
            </p>

            <form className="signup__form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />{" "}
              <br />
              <div className="signup__FLname">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />{" "}
                <br />
                <input
                  id="lastname"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
                <br />
              </div>
              <input
                type="text"
                name="userName"
                placeholder="User Name"
                onChange={handleChange}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <br />
              <button>Agree and Join</button>
            </form>
            <p>
              I agree to the <a href="">privacy policy</a> and{" "}
              <a href="">terms of service</a>
            </p>
            <Link className="account__link" to="/login">
              Already have an ccount?
            </Link>
          </div>
        </div>

        <div className="signup__about">
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

export default SignUp;