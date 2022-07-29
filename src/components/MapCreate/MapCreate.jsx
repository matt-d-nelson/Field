//---------------------IMPORTS---------------------//
// libraries
import { useCallback, useEffect, useRef, useState } from "react";
// components
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import libraries from "../MapLibraries/MapLibraries";
import MapSearch from "../MapSearch/MapSearch";
// styles
import mapStyle from "../MapLibraries/MapStyle";

// map container
const mapContainerStyle = {
  height: "400px",
};
// map options
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  // zoomControl: true,
};

function MapCreate(props) {
  //---------------------LOCAL STATE---------------------//
  const [center, setCenter] = useState({
    // latitude and longitude
    lat: 45.56477,
    lng: -94.317886,
  });

  //---------------------USE EFFECT---------------------//
  useEffect(() => {
    // set the center on mount if loc is passed in as a prop
    // currently used for editing posts
    if (props.loc != undefined) {
      setCenter(props.loc);
    }
  }, []);

  //---------------------GOOGLE MAP SETUP---------------------//
  // load the g map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // useRef for map to avoid rerendering the GoogleMap component
  const mapRef = useRef();
  // set first instance of GoogleMap component to the current mapRef
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // useCallback to save unchanging function to memory
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  });

  const setMarkerLocation = (event) => {
    console.log(props.markers);
    props.setMarkers([{ lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  };

  // ensure map is loaded without error before returning
  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading map";

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      <MapSearch panTo={panTo} posX={"40px"} posY={"230px"} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={2}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={setMarkerLocation}
      >
        {props.markers.map((marker) => (
          <Marker
            icon={{
              url: "images/icons/marker.svg",
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(10, 15),
              anchor: new window.google.maps.Point(15, 15),
            }}
            position={{ lat: marker.lat, lng: marker.lng }}
            key={marker.lat}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default MapCreate;
