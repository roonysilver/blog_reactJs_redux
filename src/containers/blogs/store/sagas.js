import { put, takeLatest } from "redux-saga/effects";
import { FormDataUtil } from "../../../common";
import { AxiosClient, AxiosMethod } from "../../../configs";
import {
  Blog_Create_Success_Type,
  Blog_Create_Type,
  Blog_Delete_Type,
  Blog_Fetch_Item_Success_Type,
  Blog_Fetch_Item_Type,
  Blog_Fetch_List_Success_Type,
  Blog_Fetch_List_Type,
  Blog_Update_Success_Type,
  Blog_Update_Type,
} from "./types";

const callApiAction = function* (nextActionType, method, url, payload) {
  let data;

  yield AxiosClient[method](url, payload).then((resp) => {
    data = resp.data;
  });

  yield put({ type: nextActionType, payload: { ...data, ...payload } });
};

function* fetchBlogWatcher() {
  yield takeLatest(Blog_Fetch_Item_Type, (action) => {
    const { payload } = action;

    return callApiAction(
      Blog_Fetch_Item_Success_Type,
      AxiosMethod.GET,
      `blogs/${payload.id}}`
    );
  });
}

function* fetchBlogListWatcher() {
  yield takeLatest(Blog_Fetch_List_Type, (action) => {
    const { payload } = action;

    const queryParams = Object.keys(payload || {})
      .filter((e) => e)
      .map((key) => `${key}=${payload[key]}`)
      .join("&");

    return callApiAction(
      Blog_Fetch_List_Success_Type,
      AxiosMethod.GET,
      `blogs?${queryParams}`
    );
  });
}

function* createBlog({ payload }) {
  let data;

  const formData = FormDataUtil.fromJson(payload);

  yield AxiosClient.post(`blogs`, formData).then((resp) => {
    data = resp.data;
  });

  yield put({
    type: Blog_Create_Success_Type,
    payload: { ...payload, ...data },
  });
}

function* createBlogWatcher() {
  yield takeLatest(Blog_Create_Type, createBlog);
}

function* updateBlog({ payload }) {
  let data;

  const formData = FormDataUtil.fromJson(payload);

  yield AxiosClient.put(`blogs/${payload.id}`, formData).then((resp) => {
    data = resp.data;
  });

  yield put({
    type: Blog_Update_Success_Type,
    payload: { ...payload, ...data },
  });
}

function* updateBlogWatcher() {
  yield takeLatest(Blog_Update_Type, updateBlog);
}

function* deleteBlogWatcher() {
  yield takeLatest(Blog_Delete_Type, ({ payload }) =>
    callApiAction(
      Blog_Fetch_List_Type,
      AxiosMethod.DELETE,
      `blogs/${payload.id}`,
      payload
    )
  );
}

export const blogSagas = [
  fetchBlogWatcher(),
  fetchBlogListWatcher(),
  deleteBlogWatcher(),
  createBlogWatcher(),
  updateBlogWatcher()
];
