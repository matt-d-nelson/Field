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
import { useHistory } from "react-router-dom";

function GlobalModal(props) {
  //---------------------IMPORTED OBJECTS---------------------//
  const dispatch = useDispatch();
  const history = useHistory();

  //---------------------REDUCER DATA---------------------//
  const modalData = useSelector((store) => store.modal);

  //---------------------EVENT HANDLERS---------------------//
  const onReturn = () => {
    dispatch({ type: "CLOSE_MODAL" });
    if (modalData.history != undefined) {
      history.push(modalData.history);
    }
  };

  const onConfirm = () => {
    dispatch(modalData.confirmDispatch);
    if (modalData.history != undefined) {
      history.push(modalData.history);
    }
  };

  //---------------------JSX RETURN---------------------//
  switch (modalData.type) {
    case "loading":
      return (
        <Dialog open={modalData.open}>
          <DialogTitle>Please wait</DialogTitle>
          <DialogContent>{modalData.message}</DialogContent>
        </Dialog>
      );
    case "error":
      return (
        <Dialog open={modalData.open}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>{modalData.message}</DialogContent>
          <DialogActions>
            <Button onClick={onReturn}>return</Button>
          </DialogActions>
        </Dialog>
      );
    case "success":
      return (
        <Dialog open={modalData.open}>
          <DialogTitle>Success!</DialogTitle>
          <DialogContent>{modalData.message}</DialogContent>
          <DialogActions>
            <Button onClick={onReturn}>return</Button>
          </DialogActions>
        </Dialog>
      );
    case "confirm":
      return (
        <Dialog open={modalData.open}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>{modalData.message}</DialogContent>
          <DialogActions>
            <Button onClick={onConfirm}>confirm</Button>
            <Button onClick={onReturn}>cancel</Button>
          </DialogActions>
        </Dialog>
      );
    default:
      return <></>;
  }
}

export default GlobalModal;
