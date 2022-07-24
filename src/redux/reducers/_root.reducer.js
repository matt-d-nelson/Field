import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import modal from "./modal.reducer";
import posts from "./posts.reducer";
import followedPosts from "./followedPosts.reducer";
import tags from "./tags.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  modal, // creates a globally rendered dialog popup
  posts, // contains all posts or all posts of a specific user
  followedPosts, // contains all posts of users that the currently logged in user is following
  tags, // contains an array of tags for a specific post
});

export default rootReducer;
