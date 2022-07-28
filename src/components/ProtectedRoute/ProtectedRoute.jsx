import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingPage from "../LandingPage/LandingPage";

function ProtectedRoute({ component, children, ...props }) {
  //---------------------IMPORTED OBJECTS---------------------//
  const user = useSelector((store) => store.user);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedComponent = component || (() => children);

  //---------------------JSX RETURN---------------------//
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.id ? (
        // If the user is logged in, show the protected component
        <ProtectedComponent />
      ) : (
        // Otherwise, redirect to the landing page
        <LandingPage />
      )}
    </Route>
  );
}

export default ProtectedRoute;
