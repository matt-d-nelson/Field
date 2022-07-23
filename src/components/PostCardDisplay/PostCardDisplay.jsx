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
        style={{ textAlign: "left" }}
        title={props.selected.username}
        avatar={
          <Avatar
            variant="square"
            onClick={onAvatar}
            src={props.selected.profile_image}
          >
            {props.selected.username[0]}
          </Avatar>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Avatar
              style={{ height: "200px", width: "150px" }}
              variant="square"
              src={props.selected.image}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography>{props.selected.title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" paragraph>
                  {props.selected.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <audio controls>
              <source src={props.selected.audio} type="audio/mp3" />
            </audio>
          </Grid>
          {props.user.id === props.selected.user_id ? (
            <Grid item>
              {/* navigate to edit window on click */}
              <Button onClick={onEdit}>edit</Button>
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </div>
  );
}

export default PostCardDisplay;
