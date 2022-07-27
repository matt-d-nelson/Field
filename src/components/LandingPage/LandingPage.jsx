import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// CUSTOM COMPONENTS
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  const onRegister = () => {
    history.push("/registration");
  };

  const onExplore = () => {
    history.push("/explore");
  };

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%", paddingTop: "40px" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card
            style={{
              boxShadow: "none",
              backgroundImage: "url(images/waterfallMoving.gif)",
              backgroundColor: "transparent",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "500px",
              paddingRight: "4px",
            }}
          >
            <CardMedia>
              <img src="images/logo.png" width="500px" />
            </CardMedia>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={onExplore}
            style={{
              width: "360px",
              border: "4px solid",
              padding: "0px",
            }}
          >
            <Typography variant="h4">explore</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} align="right">
          <Button
            variant="outlined"
            onClick={onRegister}
            style={{ border: "4px solid", padding: "0px", width: "176px" }}
          >
            <Typography variant="h4">register</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} align="left">
          <Button
            variant="outlined"
            onClick={onLogin}
            style={{ border: "4px solid", padding: "0px", width: "176px" }}
          >
            <Typography variant="h4">login</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
