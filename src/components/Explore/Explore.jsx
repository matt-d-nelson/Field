//---------------------IMPORTS---------------------//
// styling
import { Button, Typography } from "@material-ui/core";
import { useState } from "react";
import MapView from "../MapView/MapView";
import TagsView from "../TagsView/TagsView";

function Explore() {
  //---------------------IMPORTED OBJECTS---------------------//

  //---------------------REDUCER STATE---------------------//

  //---------------------LOCAL STATE---------------------//
  const [view, setView] = useState(false);

  //---------------------EVENT HANDLERS---------------------//
  const setMapView = () => {
    setView(false);
  };

  const setTagsView = () => {
    setView(true);
  };

  return (
    <div>
      <Typography variant="h3">Explore</Typography>
      <p>View 2.1</p>
      <Button variant="outlined" onClick={setMapView}>
        map
      </Button>
      <Button variant="outlined" onClick={setTagsView}>
        tags
      </Button>
      {/* conditionally render map or tags view based on button click */}
      {view ? <TagsView /> : <MapView />}
    </div>
  );
}

export default Explore;
