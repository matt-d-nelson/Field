import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    console.log("in logout");
    history.push("/landing");
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SET_POSTS", payload: [] });
  };

  return (
    <Button className={props.className} onClick={onLogout}>
      Log Out
    </Button>
  );
}

export default LogOutButton;
