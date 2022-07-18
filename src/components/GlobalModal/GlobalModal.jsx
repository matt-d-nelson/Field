import { Typography, Modal, Box, Dialog } from "@material-ui/core";
import { useSelector } from "react-redux";

function GlobalModal(props) {
  const modalData = useSelector((store) => store.modal);

  return (
    <Dialog open={true}>
      <Typography>this is a global modal</Typography>
      <p>{JSON.stringify(modalData)}</p>
    </Dialog>
    // <Modal open={true}>
    //   <Box>
    //     <Typography>this is a global modal</Typography>
    //     <p>{JSON.stringify(modalData)}</p>
    //   </Box>
    // </Modal>
  );
}

export default GlobalModal;
