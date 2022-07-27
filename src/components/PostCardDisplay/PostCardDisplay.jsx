//---------------------IMPORTS---------------------//
// styling
import {
  Avatar,
  Button,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

function PostCardDisplay(props) {
  //---------------------IMPORTED OBJECTS---------------------//
  const history = useHistory();

  //---------------------EVENT HANDLERS---------------------//
  const onEdit = () => {
    history.push(`/edit/${props.selected.id}`);
  };
  const onAvatar = () => {
    // if the post creater is the same as the logged in user
    if (props.user.id === props.selected.user_id) {
      // nav to their profile
      history.push("/user");
    } else {
      // nav to the foreign profile of the creator
      history.push(`/foreign/${props.selected.user_id}`);
    }
  };

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      <CardHeader
        className="postHeader"
        title={props.selected.username}
        titleTypographyProps={{ variant: "h3" }}
        onClick={onAvatar}
        avatar={
          <Avatar
            variant="square"
            style={{ height: "60px", width: "60px", border: "4px solid" }}
            src={props.selected.profile_image}
          >
            {props.selected.username[0]}
          </Avatar>
        }
      />
      <CardContent>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={6} align="right">
            <Avatar
              style={{ height: "200px", width: "150px", border: "4px solid" }}
              variant="square"
              src={props.selected.image}
            />
          </Grid>
          <Grid item xs={6} align="left">
            <Grid container direction="column" spacing={1}>
              {props.user.id === props.selected.user_id ? (
                <Grid item>
                  {/* navigate to edit window on click */}
                  <Button
                    onClick={onEdit}
                    fullWidth
                    style={{ border: "4px solid", padding: "0px" }}
                  >
                    <Typography variant="h5">edit this post</Typography>
                  </Button>
                </Grid>
              ) : null}
              <Grid item>
                <Typography variant="h4">{props.selected.title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" paragraph>
                  {props.selected.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <audio controls style={{ borderRadius: "0" }}>
              <source src={props.selected.audio} type="audio/mp3" />
            </audio>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  );
}

export default PostCardDisplay;
