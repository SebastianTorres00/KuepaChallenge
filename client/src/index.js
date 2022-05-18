import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import "./index.css";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import App from "./App";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
