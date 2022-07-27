//---------------------IMPORTS---------------------//
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
// libraries
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// componentes
import PostCardDisplay from "../PostCardDisplay/PostCardDisplay";

function ForeignUserProfile() {
  //---------------------IMPORTED OBJECTS---------------------//
  const history = useHistory();
  const dispatch = useDispatch();

  //---------------------REDUCER STATE---------------------//
  const user = useSelector((store) => store.user);
  const posts = useSelector((store) => store.posts);
  const followedPosts = useSelector((store) => store.followedPosts);

  //---------------------LOCAL STATE---------------------//
  const thisUserId = useParams();

  //---------------------ON MOUNT---------------------//
  useEffect(() => {
    dispatch({ type: "GET_USER_POSTS", payload: thisUserId.id });
    // if a user is logged in
    if (user.id) {
      // load followed table to conditionally render follow/unfollow button
      dispatch({ type: "GET_FOLLOWED_USER_POSTS" });
    }
  }, []);

  const onReturn = () => {
    history.push("/explore");
  };

  const onFollow = () => {
    // if a user is logged in
    if (user.id) {
      // dispatch put saga to add follow to junction table
      dispatch({
        type: "UPDATE_FOLLOWING",
        payload: { idToFollow: thisUserId.id, following: true },
      });
    } else {
      // dispatch an error message telling them to log in
      dispatch({
        type: "OPEN_MODAL",
        payload: {
          open: true,
          type: "error",
          message: `Please log in or create an accout to follow ${posts[0].username}`,
        },
      });
    }
  };

  const onUnfollow = () => {
    dispatch({
      type: "UPDATE_FOLLOWING",
      payload: { idToFollow: thisUserId.id, following: false },
    });
  };

  //---------------------JSX RETURN---------------------//
  return (
    <div style={{ marginLeft: "5%", marginRight: "5%", paddingTop: "90px" }}>
      {posts.length > 0 ? (
        <div>
          <Grid container justifyContent="center">
            <Grid item>
              <Card
                style={{ backgroundColor: "var(--transparentWhite)" }}
                className="profileCard"
              >
                <CardHeader title={`${posts[0].username}`} />
                <CardContent>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={6} align="right">
                      <Avatar
                        style={{
                          height: "181px",
                          width: "192px",
                          border: "4px solid",
                        }}
                        variant="square"
                        src={posts[0].profile_image}
                      >
                        {posts[0].username[0]}
                      </Avatar>
                    </Grid>
                    <Grid item xs={6} align="left">
                      <TextField
                        variant="outlined"
                        disabled
                        defaultValue={posts[0].profile_about}
                        multiline
                        minRows={8}
                        maxRows={8}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="outlined" onClick={onReturn} fullWidth>
                        return
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      {/* conditional render to check if the logged in user is following this user profile */}
                      {followedPosts.filter(
                        (post) =>
                          Number(post.followed_user_id) ===
                          Number(thisUserId.id)
                      ).length > 0 ? (
                        <Button
                          variant="outlined"
                          onClick={onUnfollow}
                          fullWidth
                        >
                          unfollow
                        </Button>
                      ) : (
                        <Button variant="outlined" onClick={onFollow} fullWidth>
                          follow
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Typography variant="h4">
            {posts[0].username}'s' recordings
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {posts.map((post) => (
              <Grid item xs={4} key={post.id} align="center">
                <Card
                  className="postCard"
                  style={{ backgroundColor: "var(--transparentWhite)" }}
                >
                  <PostCardDisplay user={user} selected={post} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : null}
    </div>
  );
}

export default ForeignUserProfile;
