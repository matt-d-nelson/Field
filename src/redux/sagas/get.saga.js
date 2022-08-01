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
        message: "we are unable to load any posts",
      },
    });
  }
}
// get all the posts of a specific user store data in userPosts reducer
function* getUserPosts(action) {
  try {
    const posts = yield axios.get(`/api/asset/user/${action.payload}`);
    yield put({ type: "SET_USER_POSTS", payload: posts.data });
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "we are unable to load any posts",
      },
    });
  }
}
// get all the posts of a specific user store data in foreignUserPosts reducer
function* getForeignUserPosts(action) {
  try {
    const posts = yield axios.get(`/api/asset/user/${action.payload}`);
    yield put({ type: "SET_FOREIGN_USER_POSTS", payload: posts.data });
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "we are unable to load any posts",
      },
    });
  }
}
// get all the posts of users that the logged in user is following
function* getFollowedUserPosts() {
  try {
    const posts = yield axios.get(`/api/asset/followed`);
    // put res into new reducer
    yield put({ type: "SET_FOLLOWED_POSTS", payload: posts.data });
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "we are unable to load followed user posts",
      },
    });
  }
}
// get all the posts that match the input tag
function* getFilteredPosts(action) {
  try {
    const posts = yield axios.get(`/api/asset/filtered/${action.payload}`);
    // check to see if any posts had the client requested tag
    if (posts.data.length > 0) {
      // if so, update posts reducer
      yield put({ type: "SET_POSTS", payload: posts.data });
    } else {
      // if not, inform user
      yield put({
        type: "OPEN_MODAL",
        payload: {
          open: true,
          type: "error",
          message: "we couldn't find any posts with that tag.",
        },
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "we are unable filter posts",
      },
    });
  }
}
// get all the tags for a specific post
function* getPostTags(action) {
  try {
    const tags = yield axios.get(`/api/asset/tags/${action.payload}`);
    console.log("GET TAGS", tags.data);
    yield put({ type: "SET_TAGS", payload: tags.data });
  } catch (err) {
    console.log(err);
    yield put({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "error",
        message: "we are unable load this post's tags.",
      },
    });
  }
}

function* getSaga() {
  yield takeLatest("GET_POSTS", getPosts);
  yield takeLatest("GET_USER_POSTS", getUserPosts);
  yield takeLatest("GET_FOLLOWED_USER_POSTS", getFollowedUserPosts);
  yield takeLatest("GET_FILTERED_POSTS", getFilteredPosts);
  yield takeLatest("GET_POST_TAGS", getPostTags);
  yield takeLatest("GET_FOREIGN_USER_POSTS", getForeignUserPosts);
}

export default getSaga;
