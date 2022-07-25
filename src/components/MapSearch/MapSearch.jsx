//---------------------IMPORTS---------------------//
// libraries
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
function MapSearch({ panTo }) {
  // deconstructed object returned from usePlacesAutocoplete
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 45.56477, lng: () => -94.317886 },
      radius: 200 * 1000,
    },
  });

  const panToAddress = async (address) => {
    setValue(address, false);
    clearSuggestions();
    console.log("address");
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      console.log(lat, lng);
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
    <div style={{ zIndex: 10 }}>
      <Combobox onSelect={panToAddress}>
        <ComboboxInput
          value={value}
          onChange={setAutocompleteVal}
          disabled={!ready}
          placeholder="search address"
        />
        <ComboboxPopover>
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
