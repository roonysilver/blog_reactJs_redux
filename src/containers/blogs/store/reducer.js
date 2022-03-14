import {
  createBlog,
  createBlogError,
  createBlogSuccess,
  deleteBlog,
  deleteBlogError,
  deleteBlogSuccess,
  fetchBlogList,
  fetchBlogListError,
  fetchBlogListSuccess,
  updateBlog,
  updateBlogError,
  updateBlogSuccess,
  fetchBlogItem,
  fetchBlogItemSuccess,
  fetchBlogItemError
} from "./actions";
import {
  Blog_Create_Error_Type,
  Blog_Create_Success_Type,
  Blog_Create_Type,
  Blog_Delete_Error_Type,
  Blog_Delete_Success_Type,
  Blog_Delete_Type,
  Blog_Fetch_List_Type,
  Blog_Update_Error_Type,
  Blog_Update_Success_Type,
  Blog_Update_Type,
  Blog_Fetch_List_Success_Type,
  Blog_Fetch_List_Error_Type,
  Blog_Fetch_Item_Type,
  Blog_Fetch_Item_Success_Type,
  Blog_Fetch_Item_Error_Type,
  
} from "./types";

export const blogReducer = (state = null, action) => {
  switch (action.type) {
    case Blog_Create_Type:
      return createBlog(state, action.payload);
    case Blog_Create_Success_Type:
      return createBlogSuccess(state, action.payload);
    case Blog_Create_Error_Type:
      return createBlogError(state, action.payload);
    case Blog_Update_Type:
      return updateBlog(state, action.payload);
    case Blog_Update_Success_Type:
      return updateBlogSuccess(state, action.payload);
    case Blog_Update_Error_Type:
      return updateBlogError(state, action.payload);
    case Blog_Delete_Type:
      return deleteBlog(state, action.payload);
    case Blog_Delete_Success_Type:
      return deleteBlogSuccess(state, action.payload);
    case Blog_Delete_Error_Type:
      return deleteBlogError(state, action.payload);
    case Blog_Fetch_List_Type:
      return fetchBlogList(state, action.payload);
    case Blog_Fetch_List_Success_Type:
      return fetchBlogListSuccess(state, action.payload);
    case Blog_Fetch_List_Error_Type:
      return fetchBlogListError(state, action.payload);
    case Blog_Fetch_Item_Type:
      return fetchBlogItem(state, action.payload);
    case Blog_Fetch_Item_Success_Type:
      return fetchBlogItemSuccess(state, action.payload);
    case Blog_Fetch_Item_Error_Type:
      return fetchBlogItemError(state, action.payload);
    default:
      return state;
  }
};
