import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

function ForeignUserProfile() {
  //---------------------LOCAL STATE---------------------//
  const thisUserId = useParams();
  return (
    <div>
      <Typography variant="h3">Foreign User Profile</Typography>
      <p>{thisUserId.id}</p>
    </div>
  );
}

export default ForeignUserProfile;
