//---------------------IMPORTS---------------------//
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//---------------------HELPER FUNCTIONS---------------------//
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {
    // clear any existing error on the login page
    yield put({ type: "CLEAR_LOGIN_ERROR" });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.post("/api/user/login", action.payload, config);
    // open loading modal after login attempt in case of post error
    yield put({
      type: "OPEN_MODAL",
      payload: { open: true, type: "loading", message: "Logging in..." },
    });
    yield delay(350);

    // after the user has logged in
    // get the user information from the server
    yield put({ type: "FETCH_USER" });

    // close modal
    yield put({ type: "CLOSE_MODAL" });
  } catch (error) {
    console.log("Error with user login:", error);
    if (error.response.status === 401) {
      // The 401 is the error status sent from passport
      // if user isn't in the database or
      // if the username and password don't match in the database
      yield put({ type: "LOGIN_FAILED" });
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({ type: "LOGIN_FAILED_NO_CODE" });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  // open modal when logging out
  try {
    yield put({
      type: "OPEN_MODAL",
      payload: { open: true, type: "loading", message: "Logging out..." },
    });
    yield delay(350);
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post("/api/user/logout", config);

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield put({ type: "UNSET_USER" });

    // open success modal
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "success",
        message: "You have been logged out.",
        history: "/home",
      },
    });
  } catch (error) {
    console.log("Error with user logout:", error);
  }
}

function* loginSaga() {
  yield takeLatest("LOGIN", loginUser);
  yield takeLatest("LOGOUT", logoutUser);
}

export default loginSaga;
