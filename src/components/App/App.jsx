//---------------------IMPORTS---------------------//
// libraries
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// styling
import "./App.css";
// components
import Nav from "../Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserProfile from "../UserProfile/UserProfile";
import LandingPage from "../LandingPage/LandingPage";
import NewPost from "../NewPost/NewPost";
import GlobalModal from "../GlobalModal/GlobalModal";
import EditPost from "../EditPost/EditPost";
import EditProfile from "../EditProfile/EditProfile";
import ForeignUserProfile from "../ForeignUserProfile/ForeignUserProfile";
import MapView from "../MapView/MapView";

function App() {
  //---------------------IMPORTED OBJECTS---------------------//
  const dispatch = useDispatch();

  //---------------------REDUCER STATE---------------------//
  const user = useSelector((store) => store.user);

  //---------------------ON MOUNT---------------------//
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  //---------------------JSX RETURN---------------------//
  return (
    <Router>
      <div>
        {/* ------------------GLOBAL COMPONENTS------------------ */}
        <Nav />
        {/* alert modal that is controled by reducer */}
        <GlobalModal />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          {/* ------------------UNPROTECTED ROUTES------------------ */}
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/explore">
            <MapView />
          </Route>
          <Route exact path="/foreign/:id">
            <ForeignUserProfile />
          </Route>

          {/* ------------------PROTECTED ROUTES------------------ */}
          {/*logged in shows protected component else shows LoginPage */}
          <ProtectedRoute exact path="/user">
            <UserProfile />
          </ProtectedRoute>
          <ProtectedRoute exact path="/new">
            <NewPost />
          </ProtectedRoute>
          <ProtectedRoute exact path="/edit/:id">
            <EditPost />
          </ProtectedRoute>
          <ProtectedRoute exact path="/editprofile">
            <EditProfile />
          </ProtectedRoute>

          {/* ------------------VARIABLE ROUTES------------------ */}

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1 style={{ paddingTop: "70px" }}>404: page not found</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
