import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import axios from "axios";
import { updateMapPosition } from "../GraphQL/localMutations";
import { googleAPIKey } from "../Config";

// compose url with autocomplete's response: places.address_components -> [0].long_name + [1].long_name, + [3].long_name, + [5].short_name (stateAbrrev)
// `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${googleAPIKey}`
const autoComplete = (input, google, updateMapPosition) => {
  if (!input) return;

  const dropDown = new google.maps.places.Autocomplete(input);

  dropDown.addListener("place_changed", async () => {
    const place = dropDown.getPlace();
    let formattedQueryString;
    if (
      place.hasOwnProperty("address_components") &&
      place.address_components.length > 6
    ) {
      formattedQueryString = formatQueryString(place.address_components);
    } else if (
      place.hasOwnProperty("address_components") &&
      place.address_components.length < 6
    ) {
      formattedQueryString = place.address_components[0].long_name;
    }
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedQueryString}&key=${googleAPIKey}`
    );
    const {
      lat: latitude,
      lng: longitude
    } = response.data.results[0].geometry.location;

    console.log("THE LATITUDE: ", latitude);
    console.log("THE LONGITUDE: ", longitude);
    updateMapPosition({ variables: { latitude, longitude } });
    // from the response you'll need to obtain const { lat, lng } = (response.data?)geometry.location
  });

  // input.keydown(e => {
  //   if (e.keyCode == 13) {
  //     e.preventDefault();
  //     return false;
  //   }
  // });
};

const formatQueryString = addressComponents => {
  console.log("THE ADDRESS COMPONENTS: ", addressComponents);
  const address = [];
  address.push(
    formatGeocodeString(
      `${addressComponents[0].long_name} ${addressComponents[1].long_name}`
    )
  ); // example: 1600+Amphitheatre+Parkway
  address.push(formatGeocodeString(addressComponents[3].long_name)); // example: Mountain+View
  address.push(addressComponents[5].short_name); // example: CA
  return address.join(",+"); // final result 1600+Amphitheatre+Parkway,+Mountain+View,+CA
};

const formatGeocodeString = str => {
  return str.split(" ").join("+");
};

class Geocoder extends Component {
  componentDidMount = () => {
    const { google, updateMapPosition } = this.props;
    this.addressInput.addEventListener("keydown", e => {
      if (e.keyCode === 13) e.preventDefault();
    });
    autoComplete(this.addressInput, google, updateMapPosition);
  };

  render() {
    return (
      <div>
        <input ref={x => (this.addressInput = x)} type="text" />
      </div>
    );
  }
}

export default compose(
  graphql(updateMapPosition, { name: "updateMapPosition" })
)(Geocoder);