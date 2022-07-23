//---------------------IMPORTS---------------------//
// libraries
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// styling
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
// components
import PostCardDisplay from "../PostCardDisplay/PostCardDisplay";

function UserProfile() {
  //---------------------IMPORTED OBJECTS---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------REDUCER STATE---------------------//
  const user = useSelector((store) => store.user);
  const posts = useSelector((store) => store.posts);
  const followedPosts = useSelector((store) => store.followedPosts);

  //---------------------LOCAL STATE---------------------//
  const [yourPosts, setYourPosts] = useState(true);

  //---------------------ON MOUNT---------------------//
  // get posts
  useEffect(() => {
    dispatch({ type: "GET_USER_POSTS", payload: user.id });
    dispatch({ type: "GET_FOLLOWED_USER_POSTS" });
  }, []);

  //---------------------EVENT HANDLERS---------------------//
  const newPost = () => {
    history.push("/new");
  };

  const editProfile = () => {
    history.push(`/editprofile`);
  };

  const onYourPosts = () => {
    setYourPosts(true);
  };

  const onYourFeed = () => {
    setYourPosts(false);
  };

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      <p>View 3.0</p>
      <Grid container justifyContent="center">
        <Grid item>
          <Card style={{ maxWidth: "500px" }}>
            <CardHeader title={`Welcome back,  ${user.username}`} />
            <CardContent>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6} align="right">
                  <Avatar
                    style={{ height: "190px", width: "190px" }}
                    variant="square"
                    src={user.image}
                  >
                    {user.username[0]}
                  </Avatar>
                </Grid>
                <Grid item xs={6} align="left">
                  <TextField
                    variant="outlined"
                    disabled
                    defaultValue={user.about}
                    multiline
                    minRows={8}
                    maxRows={8}
                  />
                </Grid>
                <Grid item xs={12} display="flex">
                  <ButtonGroup fullWidth>
                    <Button variant="outlined" onClick={newPost}>
                      new post
                    </Button>
                    <Button variant="outlined" onClick={editProfile}>
                      edit profile
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ButtonGroup>
        <Button variant="outlined" onClick={onYourPosts}>
          your posts
        </Button>
        <Button variant="outlined" onClick={onYourFeed}>
          your feed
        </Button>
      </ButtonGroup>

      {yourPosts ? (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Card>
                <PostCardDisplay user={user} selected={post} />
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {followedPosts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Card>
                <PostCardDisplay user={user} selected={post} />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserProfile;
