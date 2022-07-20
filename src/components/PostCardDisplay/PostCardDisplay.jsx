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

//---------------------JSX RETURN---------------------//
function PostCardDisplay(props) {
  return (
    <div>
      <CardHeader
        style={{ textAlign: "left" }}
        title={props.selected.username}
        avatar={
          <Avatar>
            {/* add navigation to profile page on click */}
            <Button>{props.selected.username[0]}</Button>
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
                <Typography variant="body1">
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
              <Button>edit</Button>
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </div>
  );
}

export default PostCardDisplay;
