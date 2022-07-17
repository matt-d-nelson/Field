import { Button, Typography } from "@material-ui/core";

function Explore() {
  return (
    <div>
      <Typography variant="h1">Explore</Typography>
      <p>
        View 2.1 / create Map and Search child components to conditionally
        render based on "map"/"tag" button clicks
      </p>
      <Button variant="outlined">map</Button>
      <Button variant="outlined">tags</Button>
    </div>
  );
}

export default Explore;
