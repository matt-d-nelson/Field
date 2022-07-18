//---------------------IMPORTS---------------------//
// libraries
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
// components
import MapCreate from "../MapCreate/MapCreate";
// styling
import { Button, Grid, Typography } from "@material-ui/core";

function NewPost() {
  //---------------------IMPORTED OBJECTS---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------LOCAL STATE---------------------//
  const [markers, setMarkers] = useState([]);
  const [picture, setPicture] = useState("");
  const [audio, setAudio] = useState("");
  const [picturePath, setPicturePath] = useState("");
  const [audioPath, setAudioPath] = useState("");

  //---------------------EVENT HANDLERS---------------------//
  const onCancel = () => {
    history.push("/user");
  };

  const onSubmit = () => {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  };

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      <Typography variant="h3">New Post</Typography>
      <p>View 3.2 / add form components to create a new post</p>
      <Grid container>
        <Grid item xs={6}>
          <MapCreate setMarkers={setMarkers} markers={markers} />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="outlined" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default NewPost;
