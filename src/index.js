import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import theme from "./MUItheme/MUItheme";

import App from "./components/App/App";
import { ThemeProvider } from "@material-ui/core";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("react-root")
);
