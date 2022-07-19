//---------------------IMPORTS---------------------//
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//---------------------HELPER FUNCTIONS---------------------//
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//---------------------SAGAS---------------------//
function* addPost(action) {
  try {
    yield put({
      type: "OPEN_MODAL",
      payload: { open: true, type: "loading", message: "Creating post..." },
    });
    // delay sending request so that the loading modal is displayed for at least a moment
    yield delay(350);
    // send post request
    const res = yield axios({
      method: "post",
      url: "/api/asset",
      data: action.payload,
      headers: { "Content-Type": "multipart/form-data" },
    });
    // const res = yield axios({
    //   method: "get",
    //   url: "/api/asset",
    // });
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "success",
        message: "Your post has been uploaded.",
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
        message: "Your post was not uploaded.",
      },
    });
  }
}

function* postSaga() {
  yield takeLatest("ADD_POST", addPost);
}

export default postSaga;
