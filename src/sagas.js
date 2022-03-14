import { blogSagas } from "./containers/blogs/store/sagas";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([...blogSagas]);
}
