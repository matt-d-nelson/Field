//---------------------IMPORTS---------------------//
// libraries
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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

  //---------------------REDUCER STATE---------------------//
  const userData = useSelector((store) => store.user);

  //---------------------LOCAL STATE---------------------//
  const [markers, setMarkers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [picturePath, setPicturePath] = useState("(none selected)");
  const [audio, setAudio] = useState("");
  const [audioPath, setAudioPath] = useState("(none selected)");
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
        user_id: userData.id,
        title: title,
        description: description,
        tags: tags,
        lat: markers[0].lat,
        lng: markers[0].lng,
      };
      console.log(newPostTemp);
      // gather inputs as form data
      const newPost = new FormData();
      newPost.append("user_id", userData.id);
      newPost.append("title", title);
      newPost.append("description", description);
      newPost.append("lat", markers[0].lat);
      newPost.append("lng", markers[0].lng);
      newPost.append("tags", tags);
      newPost.append("picture", picture);
      newPost.append("audio", audio);
      // dispach POST request to saga
      dispatch({ type: "ADD_POST", payload: newPost });
    }
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
    <div
      style={{ paddingTop: "90px", marginLeft: "30px", marginRight: "30px" }}
    >
      <Typography variant="h3">New Post</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MapCreate setMarkers={setMarkers} markers={markers} />
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                inputProps={{ style: { fontSize: 30 } }}
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
                inputProps={{ style: { fontSize: 30 } }}
                multiline
                minRows={8}
                fullWidth
                onChange={onDescriptionChange}
              />
            </Grid>
            <Grid item>
              <TextField
                inputProps={{ style: { fontSize: 30 } }}
                variant="filled"
                label="tags"
                fullWidth
                onChange={onTagsChange}
              />
            </Grid>
            <Grid container justifyContent="space-evenly">
              <Grid item xs={6}>
                <Typography variant="h5">file: {audioPath}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">file: {picturePath}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <ButtonGroup fullWidth style={{ marginBottom: "0px" }}>
                <Button
                  component="label"
                  variant="outlined"
                  style={{
                    border: "4px solid",
                    padding: "0px",
                  }}
                >
                  <input
                    name="audio"
                    type="file"
                    onChange={onAudioChange}
                    hidden
                  />
                  <Typography variant="h4">upload audio</Typography>
                </Button>
                <Button
                  component="label"
                  variant="outlined"
                  style={{
                    border: "4px solid",
                    padding: "0px",
                    marginLeft: "20px",
                  }}
                >
                  <input
                    type="file"
                    name="picture"
                    onChange={onPictureChange}
                    hidden
                  />
                  <Typography variant="h4">upload image</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
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
            variant="outlined"
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

export default NewPost;
