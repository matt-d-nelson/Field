import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

function Details() {
  const post = useParams();

  return (
    <div>
      <Typography variant="h1">Details</Typography>
      <p>View 2.2 / load details of post based on url param: {post.id}</p>
    </div>
  );
}

export default Details;
