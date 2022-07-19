import { Button, Typography } from "@material-ui/core";
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

//-------------------------------------- map container style as nessicary
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
      <p>{JSON.stringify(posts)}</p>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {/* {posts.map((marker) => (
          <Marker
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            key={marker.lat}
            onClick={() => {
              setSelected(null);
              setSelected(marker);
            }}
          />
        ))} */}
        {selected ? (
          // info window is a gmaps component that can take one child and hold any components
          <InfoWindow
            position={{ lat: Number(selected.lat), lng: Number(selected.lng) }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <img src={selected.picture.slice(7)} style={{ width: "100px" }} />
              <br />
              <audio controls>
                <source src={selected.audio.slice(7)} type="audio/mp3" />
              </audio>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default MapView;
