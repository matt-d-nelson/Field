//---------------------IMPORTS---------------------//
// styling
import { Button, TextField, Typography } from "@material-ui/core";
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
    <div>
      <TextField
        variant="filled"
        placeholder="filter posts by tag"
        onChange={updateTag}
      />
      <Button variant="outlined" onClick={onFilter}>
        filter
      </Button>
    </div>
  );
}

export default FilterPosts;
