//---------------------IMPORTS---------------------//
// styling
import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
// libraries
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  //---------------------LOCAL STATE---------------------//
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //---------------------IMPORTED OBJECTS---------------------//
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  //---------------------EVENT HANDLERS---------------------//
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  };

  const onCancel = () => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "CLEAR_LOGIN_ERROR" });
  };

  const onLogin = () => {
    dispatch({ type: "OPEN_MODAL", payload: { open: true, type: "login" } });
  };

  //---------------------JSX RETURN---------------------//
  return (
    <form className="formPanel" onSubmit={registerUser}>
      <Typography variant="h3">register</Typography>

      <Grid container spacing={2} style={{ width: "400px" }}>
        <Grid item xs={12}>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
        </Grid>

        <Grid item xs={12}>
          <label htmlFor="username">
            <TextField
              fullWidth
              inputProps={{ style: { fontSize: 30 } }}
              label="username"
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="password">
            <TextField
              fullWidth
              inputProps={{ style: { fontSize: 30 } }}
              label="password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup fullWidth>
            <Button
              style={{
                border: "4px solid",
                padding: "0px",
                marginRight: "10px",
              }}
              onClick={onCancel}
            >
              <Typography variant="h4">cancel</Typography>
            </Button>
            <Button
              component="label"
              style={{
                border: "4px solid",
                padding: "0px",
                marginLeft: "10px",
              }}
            >
              <input type="submit" name="submit" value="Register" hidden />
              <Typography variant="h4">register</Typography>
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">already have an account? </Typography>
          <Typography
            variant="h5"
            style={{ color: "var(--mainBlue)", cursor: "pointer" }}
            onClick={onLogin}
          >
            login here.
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
