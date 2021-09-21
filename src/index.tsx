import React from "react";
import ReactDOM from "react-dom";
import Editor from "./Editor";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContextProvider } from "react-dnd";

import { dashboardEditorDNDReducer } from "./redux/reducers/dashboardEditorDNDReducer";
import { dashboardEditorLayoutReducer } from "./redux/reducers/dashboardEditorLayoutReducer";

import "./styles.css";

const reducers = combineReducers({
  dashboardEditorDNDReducer,
  dashboardEditorLayoutReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <Editor />
    </DragDropContextProvider>
  </Provider>,
  rootElement
);
