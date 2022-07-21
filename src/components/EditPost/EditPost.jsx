//---------------------IMPORTS---------------------//
// styling
import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
// libraries
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// components
import MapCreate from "../MapCreate/MapCreate";

function EditPost() {
  //---------------------IMPORTED OBJECTS---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------REDUCER STATE---------------------//
  const userData = useSelector((store) => store.user);
  const posts = useSelector((store) => store.posts);

  //---------------------LOCAL STATE---------------------//
  // use state
  const [markers, setMarkers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [picturePath, setPicturePath] = useState("upload picture");
  const [audio, setAudio] = useState("");
  const [audioPath, setAudioPath] = useState("upload audio");
  const [tags, setTags] = useState("");
  // url params
  const thisPostId = useParams();
  const thisPost = posts.find((post) => post.id === Number(thisPostId.id));

  //---------------------USE EFFECT---------------------//
  // get posts
  useEffect(() => {
    dispatch({ type: "GET_POSTS" });
  }, []);

  useEffect(() => {
    if (thisPost != undefined) {
      setMarkers([{ lat: Number(thisPost.lat), lng: Number(thisPost.lng) }]);
      setTitle(thisPost.title);
      setDescription(thisPost.description);
    }
  }, [thisPost]);

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

  const onUpdate = () => {
    // verify inputs
    if (verifyAudio(audioPath) || verifyPicture(picturePath)) {
      // open global modal with error message if bad input
      dispatch({
        type: "OPEN_MODAL",
        payload: {
          open: true,
          type: "error",
          message:
            "Please input a title and ensure that any new audio and/or image files are of a supported file type.",
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
      newPost.append("id", thisPost.id);
      newPost.append("title", title);
      newPost.append("description", description);
      newPost.append("lat", markers[0].lat);
      newPost.append("lng", markers[0].lng);
      newPost.append("tags", tags);
      newPost.append("picture", picture);
      newPost.append("audio", audio);
      // dispach POST request to saga
      dispatch({ type: "UPDATE_POST", payload: newPost });
    }
  };

  //---------------------HELPER FUNCTIONS---------------------//
  const verifyAudio = (audioToVerify) => {
    const splitAudio = audioToVerify.split(".");
    const fileExtension = splitAudio[splitAudio.length - 1].toLowerCase();
    if (
      fileExtension === "mp3" ||
      fileExtension === "wav" ||
      fileExtension === "upload audio"
    ) {
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
      fileExtension === "gif" ||
      fileExtension === "upload picture"
    ) {
      return false;
    }
    return true;
  };

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      {thisPost != undefined ? (
        <div style={{ padding: "20px", marginLeft: "5%", marginRight: "5%" }}>
          <Typography variant="h3">Edit Post</Typography>
          <p>View 3.1</p>
          <p>{JSON.stringify(userData)}</p>
          <p>{JSON.stringify(thisPost)}</p>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MapCreate
                setMarkers={setMarkers}
                markers={markers}
                loc={{ lat: Number(thisPost.lat), lng: Number(thisPost.lng) }}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <TextField
                    variant="filled"
                    label="title"
                    fullWidth
                    value={title}
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
                    value={description}
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
              <Button variant="outlined" onClick={onUpdate}>
                <Typography>update</Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default EditPost;
