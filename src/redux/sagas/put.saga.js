//---------------------IMPORTS---------------------//
import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//---------------------HELPER FUNCTIONS---------------------//
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//---------------------SAGAS---------------------//
// update post
function* updatePost(action) {
  try {
    yield put({
      type: "OPEN_MODAL",
      payload: { open: true, type: "loading", message: "Updating post..." },
    });
    // delay sending request so that the loading modal is displayed for at least a moment
    yield delay(350);
    // send post request
    const res = yield axios({
      method: "put",
      url: "/api/asset",
      data: action.payload,
      headers: { "Content-Type": "multipart/form-data" },
    });
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "success",
        message: "Your post has been updated.",
        history: "/user",
      },
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "Your post was not updated.",
      },
    });
  }
}
// update profile
function* updateProfile(action) {
  try {
    yield put({
      type: "OPEN_MODAL",
      payload: { open: true, type: "loading", message: "Updating profile..." },
    });
    // delay sending request so that the loading modal is displayed for at least a moment
    yield delay(350);
    const res = yield axios({
      method: "put",
      url: "/api/asset/profile",
      data: action.payload,
      headers: { "Content-Type": "multipart/form-data" },
    });
    // update user reducer
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "success",
        message: "Your profile has been updated.",
        history: "/user",
        returnDispatch: { type: "FETCH_USER" },
      },
    });
    // yield put({ type: "FETCH_USER" });
    console.log(res);
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "Your profile was not updated.",
      },
    });
  }
}

// update following
function* updateFollowing(action) {
  try {
    yield put({
      type: "OPEN_MODAL",
      payload: { open: true, type: "loading", message: "Updating profile..." },
    });
    // delay sending request so that the loading modal is displayed for at least a moment
    yield delay(350);
    const res = yield axios({
      method: "put",
      url: "/api/asset/followed",
      data: action.payload,
    });
    // open success modal
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "success",
        message: "Your feed has been updated.",
      },
    });
    yield put({ type: "GET_FOLLOWED_USER_POSTS" });
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "Unable to follow user",
      },
    });
  }
}

function* putSaga() {
  yield takeEvery("UPDATE_POST", updatePost);
  yield takeEvery("UPDATE_PROFILE", updateProfile);
  yield takeEvery("UPDATE_FOLLOWING", updateFollowing);
}

export default putSaga;
