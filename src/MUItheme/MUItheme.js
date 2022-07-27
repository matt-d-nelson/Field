import { createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "m3x6",
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 0,
  },
  palette: {
    primary: { main: "rgb(83, 142, 82)" },
    secondary: { main: "rgb(150, 60, 47)" },
    info: { main: "rgb(111, 177, 175)" },
    text: {
      disabled: "black",
    },
  },
});

export default theme;
