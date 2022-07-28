import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  const onRegister = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { open: true, type: "register" },
    });
  };

  const onCancel = () => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "CLEAR_LOGIN_ERROR" });
  };

  return (
    <form onSubmit={login}>
      <Typography variant="h3">login</Typography>

      <Grid container spacing={2} style={{ width: "400px" }}>
        <Grid item xs={12}>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
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
              <input type="submit" name="submit" value="Log In" hidden />
              <Typography variant="h4">login</Typography>
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">not a user yet? </Typography>
          <Typography
            variant="h5"
            style={{ color: "var(--mainBlue)", cursor: "pointer" }}
            onClick={onRegister}
          >
            register an account here.
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
