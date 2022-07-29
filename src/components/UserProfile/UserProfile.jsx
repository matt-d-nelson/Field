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
    <div
      style={{
        marginLeft: "5%",
        marginRight: "5%",
        paddingTop: "90px",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item>
          <Card
            style={{
              backgroundColor: "transparent",
              marginBottom: "20px",
            }}
            elevation={0}
            className="profileCard"
          >
            <CardHeader
              title={`Welcome back,  ${user.username}`}
              titleTypographyProps={{ variant: "h3" }}
              style={{ padding: "0" }}
            />
            <CardContent>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6} align="right">
                  <Avatar
                    style={{
                      height: "183px",
                      width: "192px",
                      border: "4px solid",
                    }}
                    variant="square"
                    src={user.image}
                  >
                    {user.username[0]}
                  </Avatar>
                </Grid>
                <Grid item xs={6} align="left">
                  <TextField
                    variant="outlined"
                    inputProps={{ style: { fontSize: 30 } }}
                    disabled
                    defaultValue={user.about}
                    multiline
                    minRows={7}
                    maxRows={7}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="outlined"
                    onClick={newPost}
                    fullWidth
                    style={{ border: "4px solid", padding: "0px" }}
                  >
                    <Typography variant="h4">new</Typography>
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    onClick={editProfile}
                    fullWidth
                    style={{ border: "4px solid", padding: "0px" }}
                  >
                    <Typography variant="h4">edit profile</Typography>
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    onClick={onYourPosts}
                    fullWidth
                    style={{ border: "4px solid", padding: "0px" }}
                  >
                    <Typography variant="h4">posts</Typography>
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    onClick={onYourFeed}
                    fullWidth
                    style={{ border: "4px solid", padding: "0px" }}
                  >
                    <Typography variant="h4">feed</Typography>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {yourPosts ? (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Card
                className="postCard"
                style={{ backgroundColor: "var(--transparentWhite)" }}
              >
                <PostCardDisplay user={user} selected={post} />
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {followedPosts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Card
                className="postCard"
                style={{ backgroundColor: "var(--transparentWhite)" }}
              >
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
