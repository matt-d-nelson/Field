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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [picturePath, setPicturePath] = useState("upload picture");
  const [audio, setAudio] = useState("");
  const [audioPath, setAudioPath] = useState("upload audio");
  const [tags, setTags] = useState("");

  //---------------------EVENT HANDLERS---------------------//

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onTagsChange = (event) => {
    setTags(event.target.value);
  };

  const onPictureChange = (event) => {
    setPicture(event.target.files[0]);
    // split path and select last index to only display filename
    const splitPath = event.target.value.split("\\");
    setPicturePath(splitPath[splitPath.length - 1]);
  };

  const onAudioChange = (event) => {
    setAudio(event.target.files[0]);
    const splitPath = event.target.value.split("\\");
    setAudioPath(splitPath[splitPath.length - 1]);
  };

  const onCancel = () => {
    history.push("/user");
  };

  const onSubmit = () => {
    console.log(title);
    // verify inputs
    if (
      title === "" ||
      markers.length === 0 ||
      verifyAudio(audioPath) ||
      verifyPicture(picturePath)
    ) {
      // open global modal with error message if bad input
      dispatch({
        type: "OPEN_MODAL",
        payload: {
          open: true,
          type: "error",
          message:
            "Please select a location on the map, input a title, and upload an audio and image file.",
        },
      });
    } else {
      // temp for input verification
      const newPostTemp = {
        title: title,
        description: description,
        tags: tags,
        lat: markers[0].lat,
        lng: markers[0].lng,
      };
      console.log(newPostTemp);
    }
    const newPost = new FormData();
  };

  //---------------------HELPER FUNCTIONS---------------------//
  const verifyAudio = (audioToVerify) => {
    const splitAudio = audioToVerify.split(".");
    const fileExtension = splitAudio[splitAudio.length - 1].toLowerCase();
    if (fileExtension === "mp3" || fileExtension === "wav") {
      return false;
    }
    return true;
  };

  const verifyPicture = (imageToVerify) => {
    const splitImage = imageToVerify.split(".");
    const fileExtension = splitImage[splitImage.length - 1].toLowerCase();
    if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png" ||
      fileExtension === "gif"
    ) {
      return false;
    }
    return true;
  };

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
              <TextField
                variant="filled"
                label="title"
                fullWidth
                onChange={onTitleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="filled"
                label="description"
                multiline
                minRows={10}
                fullWidth
                onChange={onDescriptionChange}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="filled"
                label="tags"
                fullWidth
                onChange={onTagsChange}
              />
            </Grid>
            <Grid item>
              <ButtonGroup fullWidth>
                <Button component="label" variant="contained">
                  <input
                    name="audio"
                    type="file"
                    onChange={onAudioChange}
                    hidden
                  />
                  <Typography>{audioPath}</Typography>
                </Button>
                <Button component="label" variant="contained">
                  <input
                    type="file"
                    name="picture"
                    onChange={onPictureChange}
                    hidden
                  />
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
