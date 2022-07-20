import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useRef } from "react";

import libraries from "../MapLibraries/MapLibraries";
import Search from "../MapSearch/MapSearch";

//-------------------------------------- map container style as needed
const mapContainerStyle = {
  height: "600px",
};
//-------------------------------------- store in reducer
const center = {
  // latitude and longitude
  lat: 45.56477,
  lng: -94.317886,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function MapView() {
  //---------------------IMPORTED OBJECTS---------------------//
  const dispatch = useDispatch();

  //---------------------REDUCER STATE---------------------//
  const posts = useSelector((store) => store.posts);
  const user = useSelector((store) => store.user);

  //---------------------LOCAL STATE---------------------//
  const [selected, setSelected] = useState(null);

  //---------------------ON MOUNT---------------------//
  // get posts
  useEffect(() => {
    dispatch({ type: "GET_POSTS" });
  }, []);

  //---------------------GOOGLE MAP SETUP---------------------//
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // useRef for map to avoid rerenders
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  });

  // ensure map is loaded without error before returning
  if (loadError)
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  if (!isLoaded)
    return (
      <div>
        <p>error loading map</p>
      </div>
    );

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={() => {
          setSelected(null);
        }}
      >
        {posts.map((marker) => (
          <Marker
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            key={marker.lat}
            onClick={() => {
              setSelected(null);
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          // info window is a gmaps component that can take one child and hold any components
          <InfoWindow
            position={{ lat: Number(selected.lat), lng: Number(selected.lng) }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <Card
                style={{ boxShadow: "none", backgroundColor: "transparent" }}
              >
                <div>
                  <CardHeader
                    style={{ textAlign: "left" }}
                    title={selected.username}
                    avatar={
                      <Avatar>
                        {/* add navigation to profile page on click */}
                        <Button>{selected.username[0]}</Button>
                      </Avatar>
                    }
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <img src={selected.image} width="150" />
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <Typography>{selected.title}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              {selected.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <audio controls>
                          <source src={selected.audio} type="audio/mp3" />
                        </audio>
                      </Grid>
                      {user.id === selected.user_id ? (
                        <Grid item>
                          <Button>edit</Button>
                        </Grid>
                      ) : null}
                    </Grid>
                  </CardContent>
                </div>
              </Card>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default MapView;
