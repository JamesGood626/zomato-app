import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import MapContainer from "./MapContainer";
// import { SEARCH_RESTAURANTS } from "../GraphQL/remoteQueries";
import { getMapPosition } from "../GraphQL/localQueries";
import { getSearchParameters } from "../GraphQL/localQueries";

class MapController extends Component {
  render() {
    const { latitude, longitude } = this.props.mapPosition;
    const {
      categories,
      cuisines,
      establishment,
      radius
    } = this.props.searchParameters;
    return (
      <MapContainer
        latitude={latitude}
        longitude={longitude}
        categories={categories}
        cuisines={cuisines}
        establishment={establishment}
        radius={radius}
      />
    );
  }
}

export default compose(
  graphql(getMapPosition, {
    props: ({ data: { mapPosition } }) => ({
      mapPosition
    })
  }),
  graphql(getSearchParameters, {
    props: ({ data: { searchParameters } }) => ({
      searchParameters
    })
  })
)(MapController);

//   "longitude": "-74.004821",
//   "latitude": "40.742051",
