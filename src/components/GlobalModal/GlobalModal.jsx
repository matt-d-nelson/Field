//---------------------IMPORTS---------------------//
// libraries
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// styling
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

function GlobalModal(props) {
  //---------------------IMPORTED OBJECTS---------------------//
  const dispatch = useDispatch();

  //---------------------REDUCER DATA---------------------//
  const modalData = useSelector((store) => store.modal);

  //---------------------EVENT HANDLERS---------------------//
  const onReturn = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  //---------------------JSX RETURN---------------------//
  switch (modalData.type) {
    case "loading":
      return (
        <Dialog open={modalData.open}>
          <DialogTitle>Please wait</DialogTitle>
          <DialogContent>Loading...</DialogContent>
        </Dialog>
      );
    case "error":
      return (
        <Dialog open={modalData.open}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>{modalData.message}</DialogContent>
          <DialogActions>
            <Button onClick={onReturn}>Return</Button>
          </DialogActions>
        </Dialog>
      );
    default:
      return <></>;
  }
}

export default GlobalModal;
