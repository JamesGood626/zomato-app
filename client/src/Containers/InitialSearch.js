import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Query, graphql, compose } from "react-apollo";
import { updateMapPosition } from "../GraphQL/localMutations";
import gql from "graphql-tag";
import SearchForm from "./SearchForm";
import GoogleApiWrapper from "./MapContainer";
import LoadingOverlay from "./LoadingOverlay";
import { googleAPIKey } from "../Config";

const Div = styled.div`
  height: 100%;
  width: 100%;
`;

class InitialSearch extends Component {
  state = {
    latitude: null,
    longitude: null,
    trigger: false
  };

  componentDidMount = () => {
    this.getLocation();
    // Necessary to achieve Geolocation functionality
    const googleMapScript = document.createElement("script");
    googleMapScript.setAttribute("id", "addedScript");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}&libraries=places`;
    document.body.appendChild(googleMapScript);
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("Something should be here TWO? ", window.google);
  };

  componentWillUnmount = () => {
    document.getElementById("addedScript").remove();
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  showPosition = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    this.setState({
      latitude,
      longitude
    });
    console.log(
      "This is the updateMapPosition resolver function: ",
      this.props.updateMapPosition
    );
    return this.props.updateMapPosition({ variables: { latitude, longitude } });
  };

  render() {
    const { history } = this.props;
    const { latitude, longitude } = this.state;
    return (
      <Fragment>
        {latitude && longitude ? (
          <SearchForm
            history={history}
            latitude={latitude}
            longitude={longitude}
            google={window.google}
          />
        ) : (
          <LoadingOverlay />
        )}
      </Fragment>
    );
  }
}

// export default InitialSearch;

export default compose(
  graphql(updateMapPosition, { name: "updateMapPosition" })
)(InitialSearch);
