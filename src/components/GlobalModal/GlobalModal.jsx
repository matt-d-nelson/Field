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
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

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
    if (modalData.returnDispatch != undefined) {
      dispatch(modalData.returnDispatch);
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
          <div style={{ width: "400px" }}>
            <DialogTitle>
              <Typography variant="h3">loading...</Typography>
            </DialogTitle>
            <DialogContent>
              <img src="images/modal/spinningCompass.gif" />
              <Typography variant="h4">{modalData.message}</Typography>
            </DialogContent>
          </div>
        </Dialog>
      );
    case "error":
      return (
        <Dialog open={modalData.open}>
          <div style={{ width: "400px" }}>
            <DialogTitle>
              <Typography variant="h3">error</Typography>
            </DialogTitle>
            <DialogContent>
              <img src="images/modal/error.png" />
              <Typography variant="h4">{modalData.message}</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={onReturn}
                style={{
                  border: "4px solid",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
              >
                <Typography variant="h4">return</Typography>
              </Button>
            </DialogActions>
          </div>
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
            <Button onClick={onReturn}>cancel</Button>
            <Button onClick={onConfirm}>confirm</Button>
          </DialogActions>
        </Dialog>
      );
    case "login":
      return (
        <Dialog open={modalData.open}>
          <DialogContent>
            <LoginForm />
          </DialogContent>
        </Dialog>
      );
    case "register":
      return (
        <Dialog open={modalData.open}>
          <DialogContent>
            <RegisterForm />
          </DialogContent>
        </Dialog>
      );
    default:
      return <></>;
  }
}

export default GlobalModal;
