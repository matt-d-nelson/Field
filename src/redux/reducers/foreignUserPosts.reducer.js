const foreignUserPosts = (state = [], action) => {
  switch (action.type) {
    case "SET_FOREIGN_USER_POSTS":
      return action.payload;
    default:
      return state;
  }
};

export default foreignUserPosts;
