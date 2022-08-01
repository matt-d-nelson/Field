import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import modal from "./modal.reducer";
import posts from "./posts.reducer";
import followedPosts from "./followedPosts.reducer";
import tags from "./tags.reducer";
import userPosts from "./userPosts.reducer";

// primary app reducer
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  modal, // creates a globally rendered dialog popup
  posts, // contains all posts or all posts of a specific user
  followedPosts, // contains all posts of users that the currently logged in user is following
  tags, // contains an array of tags for a specific post
  userPosts, // contains all the posts of a single user
});

export default rootReducer;
