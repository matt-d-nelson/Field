//---------------------IMPORTS---------------------//
import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//---------------------HELPER FUNCTIONS---------------------//
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//---------------------SAGAS---------------------//
function* addPost(action) {
  try {
    yield put({
      type: "OPEN_MODAL",
      payload: { open: true, type: "loading", message: "creating post..." },
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
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "success",
        message: "your post has been uploaded.",
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
        message: "your post was not uploaded.",
      },
    });
  }
}

function* postSaga() {
  yield takeEvery("ADD_POST", addPost);
}

export default postSaga;
