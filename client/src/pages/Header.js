// import React from 'react'

// import "./Header.css";

// function Header() {
//   return (
//     <div>
//       <div className=" ">
//         <img
//           className="checkout__ad"
//           src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
//           alt=""
//         />
//       </div>
//       <div>
//         <h1>Home</h1>
//         <h1>How it Works</h1>
//       </div>
//       <div>
//         <button className="">How it Works</button>
//       </div>
//     </div>
//   );
// }

// export default Header;


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import "./Header.css";

const Header = () => {
  const [userData, setUserData] = useContext(UserContext);

  // const handleAuthentication = () => {
  //   if (userData) {
  //
  //   }
  // };

  return (
    <div className="nav">
      <Link to="/">
        <img
          className="nav__image"
          src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
          alt=""
        />
      </Link>

      <Link to={!userData && "/login"} className="link">
        <div className="nav__bar">
          <span>Home</span>
          <span className="nav__works">How it Works</span>
          {/* <div onClick={handleAuthentication} className=""> */}
          <button>{!userData ? "SIGN IN" : "LogOut"}</button>
          {/* </div> */}
        </div>
      </Link>
    </div>
  );
};

export default Header;
