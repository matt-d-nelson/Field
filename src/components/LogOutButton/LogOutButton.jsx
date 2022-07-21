import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

function LogOutButton(props) {
  const dispatch = useDispatch();

  const onLogout = () => {
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
