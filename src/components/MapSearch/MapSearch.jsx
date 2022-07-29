//---------------------IMPORTS---------------------//
// libraries
import { TextField } from "@material-ui/core";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

//---------------------IMPORTS---------------------//
function MapSearch(props) {
  // destructure results from usePlacesAutocomplete
  // ready / if autocomplete is ready to perform
  // value / state that autocomplete is reading
  // suggestions / includes status of autocomplete and returned data
  // setValue / update value state
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      // set a location to prefer locations around (expects a function)
      location: { lat: () => 45.56477, lng: () => -94.317886 },
      // radius (in meters) from that location
      radius: 200 * 1000,
    },
  });

  // called when an address is selected
  const panToAddress = async (address) => {
    // set the value of autocomplete to the selected address
    setValue(address, false);
    // clear all autocomplete suggestions
    clearSuggestions();
    // try catch block for api calls
    try {
      // get the geocode of the selected address
      const results = await getGeocode({ address });
      // get the lat/lng from the returned geocode
      const { lat, lng } = await getLatLng(results[0]);
      // pan to that location
      props.panTo({ lat, lng });
    } catch (err) {
      console.log(err);
      alert("error panning to location");
    }
  };

  const setAutocompleteVal = (event) => {
    setValue(event.target.value);
  };

  //---------------------JSX RETURN---------------------//
  return (
    <div>
      <TextField
        onChange={setAutocompleteVal}
        disabled={!ready}
        value={value}
        fullWidth
        variant="filled"
        placeholder="search location"
        label="search"
        inputProps={{ style: { fontSize: 30 } }}
      />
      <Combobox onSelect={panToAddress}>
        <ComboboxInput
          value={value}
          onChange={setAutocompleteVal}
          disabled={!ready}
          hidden
        />
        <ComboboxPopover
          style={{
            width: "250px",
            position: "absolute",
            backgroundColor: "var(--transparentWhite)",
            border: "none",
            zIndex: 10,
            top: props.posY,
            left: props.posX,
          }}
        >
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default MapSearch;
