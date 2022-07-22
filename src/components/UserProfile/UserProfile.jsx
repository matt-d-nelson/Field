//---------------------IMPORTS---------------------//
// libraries
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// styling
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
// components
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch } from "react-redux";
import PostCardDisplay from "../PostCardDisplay/PostCardDisplay";

function UserProfile() {
  //---------------------IMPORTED OBJECTS---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------REDUCER STATE---------------------//
  const user = useSelector((store) => store.user);
  const posts = useSelector((store) => store.posts);

  //---------------------ON MOUNT---------------------//
  // get posts
  useEffect(() => {
    dispatch({ type: "GET_USER_POSTS", payload: user.id });
  }, []);

  //---------------------EVENT HANDLERS---------------------//
  const newPost = () => {
    history.push("/new");
  };

  const editProfile = () => {
    history.push(`/editprofile/${user.id}`);
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Card style={{ maxWidth: "500px" }}>
            <CardHeader title={`Welcome back,  ${user.username}`} />
            <CardContent>
              <Grid container spacing={2} justify="center">
                <Grid item xs={6} align="right">
                  <Avatar
                    style={{ height: "190px", width: "190px" }}
                    variant="square"
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
                    rows={8}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justify="center">
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
      <p>View 3.0</p>
      <p>{JSON.stringify(user)}</p>
      <Typography variant="h4">YOUR POSTS</Typography>

      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={4} key={post.id}>
            <Card>
              <PostCardDisplay user={user} selected={post} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserProfile;
