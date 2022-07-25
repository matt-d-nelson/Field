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
    <div>
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
            style={{ width: "300px" }}
          >
            Explore
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup style={{ width: "300px" }} fullWidth>
            <Button variant="outlined" onClick={onRegister}>
              Register
            </Button>

            <Button variant="outlined" onClick={onLogin}>
              Login
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
