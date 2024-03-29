//---------------------IMPORTS---------------------//
// styling
import "./Nav.css";
// libraries
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Nav() {
  //---------------------IMPORTED OBJECTS---------------------//
  const dispatch = useDispatch();
  const history = useHistory();

  //---------------------EVENT HANDLERS---------------------//
  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SET_POSTS", payload: [] });
  };

  const onLogin = () => {
    dispatch({ type: "OPEN_MODAL", payload: { open: true, type: "login" } });
  };

  //---------------------REDUCER STATE---------------------//
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div>
        {/* ------------------UNPROTECTED LINKS------------------ */}
        {!user.id && (
          <>
            {/* // If there's no user, show login/registration links */}
            <button onClick={onLogin} className="navLink">
              <img src="images/icons/login.svg" className="navImg" />
            </button>
            <Link className="navLink" to="/explore">
              <img src="images/icons/explore.svg" className="navImg" />
            </Link>
          </>
        )}

        {/* ------------------PROTECTED LINKS------------------ */}
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              <img src="images/icons/profile.svg" className="navImg" />
            </Link>

            <button onClick={onLogout} className="navLink">
              <img src="images/icons/logout.svg" className="navImg" />
            </button>

            <Link className="navLink" to="/explore">
              <img src="images/icons/explore.svg" className="navImg" />
            </Link>
          </>
        )}

        {/* ------------------GLOBAL LINKS------------------ */}
        <Link className="navLink" to="/about">
          <img src="images/icons/about.svg" className="navImg" />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
