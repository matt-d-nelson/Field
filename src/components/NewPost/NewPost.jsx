//---------------------IMPORTS---------------------//
// libraries
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
// components
import MapCreate from "../MapCreate/MapCreate";
// styling
import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

function NewPost() {
  //---------------------IMPORTED OBJECTS---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------LOCAL STATE---------------------//
  const [markers, setMarkers] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [picturePath, setPicturePath] = useState("upload picture");
  const [audio, setAudio] = useState("");
  const [audioPath, setAudioPath] = useState("upload audio");
  const [tags, setTags] = useState("");

  //---------------------EVENT HANDLERS---------------------//
  const onCancel = () => {
    history.push("/user");
  };

  const onSubmit = () => {};

  //---------------------JSX RETURN---------------------//
  return (
    <div style={{ padding: "20px", marginLeft: "5%", marginRight: "5%" }}>
      <Typography variant="h3">New Post</Typography>
      <p>View 3.2 / add form components to create a new post</p>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MapCreate setMarkers={setMarkers} markers={markers} />
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField variant="filled" label="title" fullWidth />
            </Grid>
            <Grid item>
              <TextField
                variant="filled"
                label="description"
                multiline
                minRows={10}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField variant="filled" label="tags" fullWidth />
            </Grid>
            <Grid item>
              <ButtonGroup fullWidth>
                <Button componenet="label" variant="contained">
                  <input name="picture" type="file" hidden />
                  <Typography>{audioPath}</Typography>
                </Button>
                <Button componenet="label" variant="contained">
                  <input name="picture" type="file" hidden />
                  <Typography>{picturePath}</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={onCancel}>
            <Typography>cancel</Typography>
          </Button>
          <Button variant="outlined" onClick={onSubmit}>
            <Typography>submit</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default NewPost;
