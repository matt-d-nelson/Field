import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function EditProfile() {
  //---------------------IMPORTED OBJECTS---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------REDUCER STATE---------------------//
  const user = useSelector((store) => store.user);

  //---------------------LOCAL STATE---------------------//
  const [about, setAbout] = useState("");
  const [picture, setPicture] = useState("");
  const [picturePath, setPicturePath] = useState("(none selected)");

  //---------------------USE EFFECT---------------------//
  useEffect(() => {
    if (user != {} && user.about != null) {
      setAbout(user.about);
    }
  }, [user]);

  //---------------------EVENT HANDLERS---------------------//
  const onAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const onPictureChange = (event) => {
    setPicture(event.target.files[0]);
    // split path and select last index to only display filename
    const splitPath = event.target.value.split("\\");
    setPicturePath(splitPath[splitPath.length - 1]);
  };

  const onSubmit = () => {
    // verify inputs
    if (verifyPicture(picturePath)) {
      // open global modal with error message if bad input
      dispatch({
        type: "OPEN_MODAL",
        payload: {
          open: true,
          type: "error",
          message: "Please upload a supported image type.",
        },
      });
    } else {
      // gather inputs as form data
      const updatedProfile = new FormData();
      updatedProfile.append("id", user.id);
      updatedProfile.append("picture", picture);
      updatedProfile.append("about", about);
      // dispatch PUT request to saga
      dispatch({ type: "UPDATE_PROFILE", payload: updatedProfile });
    }
  };

  const onCancel = () => {
    history.push("/user");
  };

  //---------------------HELPER FUNCTIONS---------------------//
  const verifyPicture = (imageToVerify) => {
    const splitImage = imageToVerify.split(".");
    const fileExtension = splitImage[splitImage.length - 1].toLowerCase();
    if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png" ||
      fileExtension === "gif" ||
      fileExtension === "(none selected)"
    ) {
      return false;
    }
    return true;
  };

  //---------------------JSX RETURN---------------------//
  return (
    <div style={{ paddingTop: "90px", marginLeft: "5%", marginRight: "5%" }}>
      <Typography variant="h3">Edit Profile</Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Grid container direction="column" spacing={1}>
            <Grid item align="right">
              <Avatar
                style={{ height: "183px", width: "192px", border: "4px solid" }}
                variant="square"
                src={user.image}
              >
                {user.username[0]}
              </Avatar>
            </Grid>
            <Grid item align="right">
              <Button
                component="label"
                variant="outlined"
                style={{ width: "200px", border: "4px solid", padding: "0px" }}
              >
                <input
                  type="file"
                  name="picture"
                  onChange={onPictureChange}
                  hidden
                />
                <Typography variant="h4">upload picture</Typography>
              </Button>
              <Typography variant="h4">file: {picturePath}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} align="left">
          <TextField
            label="about"
            variant="outlined"
            inputProps={{ style: { fontSize: 30 } }}
            value={about}
            onChange={onAboutChange}
            multiline
            minRows={9}
            maxRows={9}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            onClick={onCancel}
            style={{
              border: "4px solid",
              padding: "0px",
              marginRight: "8px",
              width: "200px",
            }}
            color="secondary"
          >
            <Typography variant="h4">cancel</Typography>
          </Button>
          <Button
            onClick={onSubmit}
            style={{
              border: "4px solid",
              padding: "0px",
              marginLeft: "7px",
              width: "200px",
            }}
            color="primary"
          >
            <Typography variant="h4">submit</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditProfile;
