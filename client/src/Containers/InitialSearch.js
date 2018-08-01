import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SearchForm from "./SearchForm";
import GoogleApiWrapper from "./MapContainer";
import LoadingOverlay from "./LoadingOverlay";

// I'll have to create a component for the initial query
// As this component will be responsible for routing
const Div = styled.div`
  height: 100%;
  width: 100%;
`;

class InitialSearch extends Component {
  state = {
    latitude: null,
    longitude: null
  };

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  showPosition = position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    this.setState({
      latitude: lat,
      longitude: lon
    });

    console.log(
      "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude
    );
  };

  render() {
    const { latitude, longitude } = this.state;
    return (
      <Fragment>
        {latitude && longitude ? (
          <SearchForm latitude={latitude} longitude={longitude} />
        ) : (
          <LoadingOverlay />
        )}
      </Fragment>
    );
  }
}

export default InitialSearch;
