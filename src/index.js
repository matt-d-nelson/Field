//---------------------IMPORTS---------------------//
// libraries
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// styling
import theme from "./MUItheme/MUItheme";
import { ThemeProvider } from "@material-ui/core";
// components
import store from "./redux/store";
import App from "./components/App/App";

//---------------------MAIN RENDER---------------------//
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("react-root")
);
