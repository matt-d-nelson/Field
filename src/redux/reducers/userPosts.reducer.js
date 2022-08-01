const userPostsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_POSTS":
      return action.payload;
    default:
      return state;
  }
};

export default userPostsReducer;
