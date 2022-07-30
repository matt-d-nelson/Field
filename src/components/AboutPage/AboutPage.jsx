//---------------------IMPORTS---------------------//
import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";

const about = `Field recordings, or sound recordings of acoustic environments, are focused outward. Instead of recording a specific instrument in a controlled studio setting, they are recorded in open spaces, capturing anything that makes a sound. Because of this, these recordings are intrinsically tied to the environment and the location in which they were recorded.

With this quality in mind, Field is an application to share and search for field recordings using a map based interface.`;

const tech = `Language
- JavaScript

Front-End
- React
- React-Redux
- Redux-Sagas
- Axios
- HTML
- CSS
- Material UI
- Reach UI - Combobox
- Google Maps API
    - Maps JavaScript API
    - Geolocation API
    - Places API

Back-End
- Node
- Express
- SQL
- multer
- dotEnv
- bvrypt
- passport

Hosting
- Heroku
- Heroku Postgres
- Cloudinary

Art
- Aesprite
- Google Maps`;

const usage = `Register / Login
------
1. Navigate to login modal.
    - Click the green door icon on the top of the page.
    - Click the 'login' or 'register' buttons on the landing page.
2. Login or Register.
    - Enter your username if logging in or desired username if registering an account.
    - Enter your password if logging in or desired password if registering an account.
    - Click the “login” or 'register' button respectively.
    - Click the 'cancel' button to close the modal.
3. To logout, click the red door icon on the top of the page.

Explore
------
- Click the compass icon on the top of the page to navigate to the explore page.
- Filter map markers.
    1. Enter a word to filter the markers by into the 'filter' text field.
    2. Click the 'filter' button.
- Pan map to location.
    1. Type the desired location into the 'search' text field.
    2. Select a location from the dropdown below.
- Explore markers.
    1. Click one of the red markers on the map to see its details.
    2. Click the Avatar at the top of the details window to navigate to that user's profile page.
        - Click the 'follow'/'unfollow' button to add/remove that user's posts from your profile's feed.
        - Click the 'return' button to return to the map.
        
Create
------
- Click the profile icon at the top of the page to navigate to your profile page.
- Edit Profile.
    1. Click the 'edit profile' button.
    2. Click the 'upload image' button to upload a profile image from your device.
    3. Type desired information into the 'about' text field.
    4. Click 'submit'/'cancel' to submit the new information or to cancel updating.
- New Post
    1. Click a location on the map to create a marker, panning to a location as necessary (as detailed above in “Explore”)
    2. Enter the required fields:
        - Type the title in the 'title' text field.
        - Click the 'upload audio' button to upload audio from your device.
        - Click the 'upload image' button to upload an image from your device.
    3. Enter the optional fields:
        - Type the description in the 'description' text field.
        - Type the tags (separated by a “,”) into the 'tags' text field.
    4. Click 'submit'/'cancel' to create the post or to cancel creation.
- Edit Post
    1. Update the post information as desired (as detailed above in 'New Post').
        - Click the 'update' button to update the post.
        - Click the 'delete' button to delete the post.
        - Click the 'cancel' button to cancel the update.
        
Feed
------
- Click the 'posts' button to see all of your created posts.
- Click the 'feed' button to see the posts of all the users you follow.`;

const thanks = `Thanks to: 
- my friends and family (especially my partner Nina) for all the support and encouragement.  
- Sam Nelson for teaching me some of his low level developer knowledge.
- Rob Johnson for encouraging me to go to Prime and offering advice and feedback along the way.
- everyone in the Dorian cohort for learning with me and laughing at all my amazing jokes.
- Chris, Kris, Dev, Christy, Bethany and everyone else at Prime Digital Academy for all the knowledge and support!`;

function AboutPage() {
  //---------------------JSX RETURN---------------------//
  return (
    <div style={{ paddingTop: "70px", marginRight: "10%", marginLeft: "10%" }}>
      <div>
        <Typography variant="h3">About</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              disabled
              inputProps={{ style: { fontSize: 30 } }}
              label="about"
              multiline
              fullWidth
              defaultValue={about}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              disabled
              inputProps={{ style: { fontSize: 30 } }}
              label="tech"
              multiline
              fullWidth
              defaultValue={tech}
              maxRows={10}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              disabled
              inputProps={{ style: { fontSize: 30 } }}
              label="usage"
              multiline
              fullWidth
              defaultValue={usage}
              maxRows={10}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              disabled
              inputProps={{ style: { fontSize: 30 } }}
              label="thanks"
              multiline
              fullWidth
              defaultValue={thanks}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AboutPage;
