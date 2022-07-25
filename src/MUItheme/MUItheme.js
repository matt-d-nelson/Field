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
});

export default theme;
