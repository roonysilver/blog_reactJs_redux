import { TransformerUtil } from "../../../common";

export const blogListSelector = (state) => {
  return TransformerUtil.objToList(state.blogs.items);
};
export const blogsTotalSelector = (state) => state.blogs.count;

export const blogsTotalPageSelector = (state) => state.blogs.total;

export const blogDetailsSelector = (state, id) => state.blogs.items[id]
