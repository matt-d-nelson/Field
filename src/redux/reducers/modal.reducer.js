const modalReducer = (
  state = { open: false, type: "none", message: "" },
  action
) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return action.payload;
    case "CLOSE_MODAL":
      return { open: false, type: "none", message: "" };
    default:
      return state;
  }
};

export default modalReducer;
