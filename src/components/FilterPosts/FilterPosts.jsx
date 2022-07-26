//---------------------IMPORTS---------------------//
// styling
import { Button, Grid, TextField, Typography } from "@material-ui/core";
// components
import { useState } from "react";
import { useDispatch } from "react-redux";

function FilterPosts() {
  //---------------------IMPORTED OBJECTS---------------------//
  const dispatch = useDispatch();
  //---------------------LOCAL STATE---------------------//
  const [tag, setTag] = useState("");

  //---------------------EVENT HANDLERS---------------------//
  const updateTag = (event) => {
    setTag(event.target.value);
  };

  const onFilter = () => {
    if (tag === "") {
      dispatch({
        type: "OPEN_MODAL",
        payload: {
          open: true,
          type: "error",
          message: "Please input a tag to filter posts by.",
        },
      });
    } else {
      dispatch({ type: "GET_FILTERED_POSTS", payload: tag });
    }
  };

  //---------------------JSX RETURN---------------------//
  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <TextField
          variant="filled"
          placeholder="filter posts by tag"
          onChange={updateTag}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <Button variant="outlined" onClick={onFilter} fullWidth>
          filter
        </Button>
      </Grid>
    </Grid>
  );
}

export default FilterPosts;
