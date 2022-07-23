const followedPostsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FOLLOWED_POSTS":
      return action.payload;
    default:
      return state;
  }
};

export default followedPostsReducer;
