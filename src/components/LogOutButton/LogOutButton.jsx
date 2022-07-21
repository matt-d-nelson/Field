import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      className={props.className}
      onClick={() => dispatch({ type: "LOGOUT" })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
