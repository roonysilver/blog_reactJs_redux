import { combineReducers, createStore } from "redux";
import { blogInitialData } from "../containers/blogs/store/initial-data";
import { blogReducer } from '../containers'

const reducers = combineReducers({
    blogs: blogReducer
});

export const appStore = createStore(
    reducers,
    {
        blogs: blogInitialData
    }
)