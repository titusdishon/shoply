import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import setupAxiosInterceptors from "./config/axios-interceptors";
import {bindActionCreators} from "redux";

setupAxiosInterceptors(() => actions.clearAuthentication("cleared"));
const actions = bindActionCreators({ type:'CLEAR_ERRORS' }, store.dispatch);

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
