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
  const postTags = useSelector((store) => store.tags);

  //---------------------LOCAL STATE---------------------//
  // use state
  const [markers, setMarkers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [picturePath, setPicturePath] = useState("(none selected)");
  const [audio, setAudio] = useState("");
  const [audioPath, setAudioPath] = useState("(none selected)");
  const [tags, setTags] = useState("");
  // url params
  const thisPostId = useParams();
  const thisPost = posts.find((post) => post.id === Number(thisPostId.id));

  //---------------------USE EFFECT---------------------//
  // get posts
  useEffect(() => {
    dispatch({ type: "GET_POSTS" });
    dispatch({ type: "GET_POST_TAGS", payload: thisPostId.id });
  }, []);
  // update text fields if thisPost is loaded
  useEffect(() => {
    if (thisPost != undefined) {
      setMarkers([{ lat: Number(thisPost.lat), lng: Number(thisPost.lng) }]);
      setTitle(thisPost.title);
      setDescription(thisPost.description);
    }
  }, [thisPost]);
  // update tags text field if postTags is loaded
  useEffect(() => {
    if (postTags.length > 0) {
      setTags(stringifyTags(postTags));
    } else {
      setTags("");
    }
  }, [postTags]);

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
            "please input a title and ensure that any new audio and/or image files are of a supported file type.",
        },
      });
    } else {
      // gather inputs as form data
      const updatedPost = new FormData();
      updatedPost.append("id", thisPost.id);
      updatedPost.append("user_id", thisPost.user_id);
      updatedPost.append("title", title);
      updatedPost.append("description", description);
      updatedPost.append("lat", markers[0].lat);
      updatedPost.append("lng", markers[0].lng);
      updatedPost.append("tags", tags);
      updatedPost.append("picture", picture);
      updatedPost.append("audio", audio);
      // dispach PUT request to saga
      dispatch({ type: "UPDATE_POST", payload: updatedPost });
    }
  };

  const onDelete = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        type: "confirm",
        message: `once deleted, ${thisPost.title} will be gone forever`,
        confirmDispatch: {
          type: "DELETE_POST",
          payload: { postId: thisPostId.id, userId: thisPost.user_id },
        },
      },
    });
  };

  //---------------------HELPER FUNCTIONS---------------------//
  const verifyAudio = (audioToVerify) => {
    // ensure there is not a new file uploaded or that the new file is a supported type
    const splitAudio = audioToVerify.split(".");
    const fileExtension = splitAudio[splitAudio.length - 1].toLowerCase();
    if (
      fileExtension === "mp3" ||
      fileExtension === "wav" ||
      fileExtension === "(none selected)"
    ) {
      return false;
    }
    return true;
  };

  const verifyPicture = (imageToVerify) => {
    // ensure there is not a new file uploaded or that the new file is a supported type
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

  const stringifyTags = (tagsToStringify) => {
    let returnArray = [];
    // loop through tags
    for (let i = 0; i < tagsToStringify.length; i++) {
      // push each of them to the return array
      returnArray.push(tagsToStringify[i].tag_name);
    }
    // join the return array and return the resulting string
    return returnArray.join(", ");
  };
  //---------------------JSX RETURN---------------------//
  return (
    <div>
      {thisPost != undefined ? (
        <div
          style={{
            paddingTop: "90px",
            marginLeft: "30px",
            marginRight: "30px",
          }}
        >
          <Typography variant="h3">Edit Post</Typography>
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
                    inputProps={{ style: { fontSize: 30 } }}
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
                    inputProps={{ style: { fontSize: 30 } }}
                    multiline
                    minRows={8}
                    fullWidth
                    value={description}
                    onChange={onDescriptionChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    inputProps={{ style: { fontSize: 30 } }}
                    variant="filled"
                    label="tags"
                    fullWidth
                    value={tags}
                    onChange={onTagsChange}
                    placeholder="enter single word tags separated by a ','"
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
                  marginLeft: "7px",
                  width: "200px",
                }}
              >
                <Typography variant="h4">cancel</Typography>
              </Button>
              <Button
                variant="outlined"
                onClick={onDelete}
                style={{
                  border: "4px solid",
                  padding: "0px",
                  marginLeft: "7px",
                  width: "200px",
                }}
                color="secondary"
              >
                <Typography variant="h4">delete</Typography>
              </Button>
              <Button
                variant="outlined"
                onClick={onUpdate}
                style={{
                  border: "4px solid",
                  padding: "0px",
                  marginLeft: "7px",
                  width: "200px",
                }}
                color="primary"
              >
                <Typography variant="h4">update</Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
}

export default EditPost;
