//---------------------IMPORTS---------------------//
// styling
import mapStyle from "../MapLibraries/MapStyle";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
// libraries
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback, useRef } from "react";
// components
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import libraries from "../MapLibraries/MapLibraries";
import Search from "../MapSearch/MapSearch";
import PostCardDisplay from "../PostCardDisplay/PostCardDisplay";
import FilterPosts from "../FilterPosts/FilterPosts";

// full page container
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
// default center on my home in st joseph <3
const center = {
  // latitude and longitude
  lat: 45.56477,
  lng: -94.317886,
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  // zoomControl: true,
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
    mapRef.current.setZoom(12);
  });

  // ensure map is loaded without error before returning
  if (loadError)
    return (
      <div style={{ paddingTop: "90px" }}>
        <p>loading...</p>
      </div>
    );
  if (!isLoaded)
    return (
      <div style={{ paddingTop: "90px" }}>
        <p>error loading map</p>
      </div>
    );

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      <div className="aboveMap">
        <Card
          style={{
            maxWidth: "250px",
            backgroundColor: "var(--transparentWhite)",
            // border: "10px solid white",
          }}
        >
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h3">Explore</Typography>
              </Grid>
              <Grid item xs={12}>
                <FilterPosts />
              </Grid>
              <Grid item xs={12}>
                <Search panTo={panTo} posX={"30px"} posY={"289px"} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={3}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={() => {
          setSelected(null);
        }}
      >
        {posts.map((marker) => (
          <Marker
            icon={{
              url: "images/icons/marker.svg",
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(10, 15),
              anchor: new window.google.maps.Point(15, 15),
            }}
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
            style={{ backgroundColor: "transparent" }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <Card
                style={{
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
              >
                <PostCardDisplay user={user} selected={selected} />
              </Card>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default MapView;
