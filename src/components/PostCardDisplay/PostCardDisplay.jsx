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
    //nav to profile
    if ((props.user.id = props.selected.user_id)) {
      history.push("/user");
    } else {
      console.log("navigate to forign profile");
    }
  };

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      <CardHeader
        style={{ textAlign: "left" }}
        title={props.selected.username}
        avatar={
          <Avatar>
            {/* add navigation to profile page on click */}
            <Button onClick={onAvatar}>{props.selected.username[0]}</Button>
          </Avatar>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src={props.selected.image} width="150" />
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
