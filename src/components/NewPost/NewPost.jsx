import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function NewPost() {
  const history = useHistory();

  const onCancel = () => {
    history.push("/user");
  };

  const onSubmit = () => {};

  return (
    <div>
      <Typography variant="h1">New Post</Typography>
      <p>View 3.2 / add form components to create a new post</p>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="outlined" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default NewPost;
