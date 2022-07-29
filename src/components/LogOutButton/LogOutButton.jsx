//---------------------IMPORTS---------------------//
// styling
import { Button } from "@material-ui/core";
// libraries
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function LogOutButton(props) {
  //---------------------IMPORTED OBJECTS---------------------//
  const dispatch = useDispatch();
  const history = useHistory();

  //---------------------EVENT HANDLERS---------------------//
  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SET_POSTS", payload: [] });
  };

  //---------------------JSX RETURN---------------------//
  return (
    <Button className={props.className} onClick={onLogout}>
      Log Out
    </Button>
  );
}

export default LogOutButton;
