import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* ------------------UNPROTECTED LINKS------------------ */}
        {!user.id && (
          <>
            {/* // If there's no user, show login/registration links */}
            <Link className="navLink" to="/login">
              Login
            </Link>
            <Link className="navLink" to="/explore">
              Explore
            </Link>
          </>
        )}

        {/* ------------------PROTECTED LINKS------------------ */}
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Profile
            </Link>
            <Link className="navLink" to="/new">
              New Post
            </Link>
            <Link className="navLink" to="/explore">
              Explore
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
