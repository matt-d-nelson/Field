import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import { Button, Typography } from "@material-ui/core";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  const onRegister = () => {
    history.push("/registration");
  };

  const onExplore = () => {
    history.push("/explore");
  };

  return (
    <div>
      <Typography variant="h1">FIELD</Typography>
      <Button variant="outlined" onClick={onExplore}>
        Explore
      </Button>
      <br />
      <Button variant="outlined" onClick={onRegister}>
        Register
      </Button>
      <br />
      <Button variant="outlined" onClick={onLogin}>
        Login
      </Button>
    </div>
  );
}

export default LandingPage;
