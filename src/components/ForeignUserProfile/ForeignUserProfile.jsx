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

  //---------------------LOCAL STATE---------------------//
  const thisUserId = useParams();

  //---------------------ON MOUNT---------------------//
  useEffect(() => {
    dispatch({ type: "GET_USER_POSTS", payload: thisUserId.id });
  }, []);

  const onReturn = () => {
    history.push("/explore");
  };

  const onFollow = () => {
    // dispatch put saga to add follow to junction table
  };

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      <Typography variant="h3">Foreign User Profile</Typography>
      <p>View 2.3 User ID: {thisUserId.id}</p>
      {posts.length > 0 ? (
        <div>
          <Grid container justifyContent="center">
            <Grid item>
              <Card style={{ maxWidth: "500px" }}>
                <CardHeader title={`${posts[0].username}`} />
                <CardContent>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={6} align="right">
                      <Avatar
                        style={{ height: "190px", width: "190px" }}
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
                      />
                    </Grid>
                    <Grid item xs={12} display="flex">
                      <ButtonGroup fullWidth>
                        <Button variant="outlined" onClick={onReturn}>
                          return
                        </Button>
                        <Button variant="outlined" onClick={onFollow}>
                          follow
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Typography variant="h4">posts</Typography>

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
      ) : null}
    </div>
  );
}

export default ForeignUserProfile;
