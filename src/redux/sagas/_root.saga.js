import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import postSaga from "./post.saga";
import getSaga from "./get.saga";
import putSaga from "./put.saga";
import deleteSaga from "./delete.saga";

// primary app saga
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    postSaga(),
    getSaga(),
    putSaga(),
    deleteSaga(),
  ]);
}
