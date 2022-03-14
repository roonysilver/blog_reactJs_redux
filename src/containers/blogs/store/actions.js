import { TransformerUtil } from "../../../common";

export const fetchBlogList = (state, payload) => {
  return state;
};

export const fetchBlogListSuccess = (state, payload) => {
  const newState = {
    ...state,
    ...payload.pagination,
    loading: false,
    items: TransformerUtil.listToObj(payload.data.items, "id"),
  };

  return newState;
};

export const fetchBlogListError = (state, payload) => {
  return state;
};

export const fetchBlogItem = (state, payload) => {
  const newState = {
    ...state,
  };

  return newState;
};

export const fetchBlogItemSuccess = (state, payload) => {
  const { data } = payload;

  const newState = {
    ...state
  }

  newState.items[data.id] = data;
  return newState;
};

export const fetchBlogItemError = (state, payload) => {
  return state;
};

export const createBlog = (state) => {
  state.loading = true;

  return state;
};

export const createBlogSuccess = (state, payload) => {
  const newState = { ...state };
  newState.loading = false;

  return newState;
};

export const createBlogError = (state, error) => {
  console.log(error);

  return state;
};

export const updateBlog = (state, payload) => {
  state.loading = true
  return updateBlogSuccess(state, payload);
};

export const updateBlogSuccess = (state, payload) => {
  const newState = { ...state };
  newState.items[payload.id] = payload.data
  newState.loading = false;

  return newState;
};

export const updateBlogError = (state, error) => {
  console.log(error);
  return {
    ...state,
    error
  };
};

export const deleteBlog = (state, payload) => {
  const newState = {
    ...state,
    loading: true,
  };

  return newState;
};

export const deleteBlogSuccess = (state, data) => {
  const { payload } = data;

  const newState = { ...state, loading: false };

  delete state.items[payload.id];

  return newState;
};

export const deleteBlogError = (state) => {
  // DO something
  // Return new State
  return state;
};
