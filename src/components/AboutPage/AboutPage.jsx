import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div style={{ paddingTop: "70px" }}>
      <div>
        <p>
          About Page, unprotected, flesh out with info about app and tech used.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
