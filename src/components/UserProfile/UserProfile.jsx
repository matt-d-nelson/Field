//---------------------IMPORTS---------------------//
// libraries
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// styling
import { Button, Card, Grid, Typography } from "@material-ui/core";
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
    dispatch({ type: "GET_POSTS" });
  }, []);

  //---------------------EVENT HANDLERS---------------------//
  const newPost = () => {
    history.push("/new");
  };

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>View 3.0</p>
      <p>{JSON.stringify(user)}</p>
      <Typography variant="h4">YOUR POSTS</Typography>
      <Button variant="outlined" onClick={newPost}>
        New Post
      </Button>
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
