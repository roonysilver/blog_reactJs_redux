import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { blogInitialData, blogReducer } from "./containers";
import { AppRoutes } from "./routes";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  blogs: blogReducer,
});

const store = createStore(
  reducers,
  {
    blogs: blogInitialData,
  },
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
