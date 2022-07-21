//---------------------IMPORTS---------------------//
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//---------------------SAGAS---------------------//

// get all posts
function* getPosts() {
  try {
    const posts = yield axios.get("/api/asset");
    console.log("TEST", posts.data);
    yield put({ type: "SET_POSTS", payload: posts.data });
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "We are unable to load any posts",
      },
    });
  }
}
// get all the posts of a specific user
function* getUserPosts(action) {
  try {
    const posts = yield axios.get(`/api/asset/user/${action.payload}`);
    yield put({ type: "SET_POSTS", payload: posts.data });
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "We are unable to load any posts",
      },
    });
  }
}

function* getSaga() {
  yield takeLatest("GET_POSTS", getPosts);
  yield takeLatest("GET_USER_POSTS", getUserPosts);
}

export default getSaga;
