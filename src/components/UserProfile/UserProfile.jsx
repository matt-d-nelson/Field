import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function UserProfile() {
  const history = useHistory();

  const user = useSelector((store) => store.user);

  const newPost = () => {
    history.push("/new");
  };

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>View 3.0 / flesh out with profile info and post details</p>
      <p>Your ID is: {user.id}</p>
      <Button variant="outlined" onClick={newPost}>
        New Post
      </Button>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserProfile;
