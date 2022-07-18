import { Typography } from "@material-ui/core";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useCallback, useRef } from "react";

import libraries from "../MapLibraries/MapLibraries";
import MapSearch from "../MapSearch/MapSearch";

// map container
const mapContainerStyle = {
  height: "400px",
  //   width: "400px",
  //   height: "300px",
};
// lat lng where map is centered
const center = {
  // latitude and longitude
  lat: 45.56477,
  lng: -94.317886,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function MapCreate(props) {
  // load the g map
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
    mapRef.current.setZoom(14);
  });

  const setMarkerLocation = (event) => {
    console.log(props.markers);
    props.setMarkers([{ lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  };

  // ensure map is loaded without error before returning
  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading map";

  return (
    <div>
      <MapSearch panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={setMarkerLocation}
      >
        {props.markers.map((marker) => (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            key={marker.lat}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default MapCreate;
