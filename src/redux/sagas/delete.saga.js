//---------------------IMPORTS---------------------//
import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//---------------------HELPER FUNCTIONS---------------------//
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//---------------------SAGAS---------------------//
function* deletePost(action) {
  try {
    yield put({
      type: "OPEN_MODAL",
      payload: { open: true, type: "loading", message: "deleting post..." },
    });
    yield delay(350);
    const res = yield axios({
      method: "delete",
      url: `/api/asset/${action.payload.postId}/${action.payload.userId}`,
    });
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "success",
        message: "your post has been obliterated.",
        history: "/user",
      },
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "your post was not deleted.",
      },
    });
  }
}

function* deleteSaga() {
  yield takeEvery("DELETE_POST", deletePost);
}

export default deleteSaga;
