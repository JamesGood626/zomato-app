import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import GoogleApiWrapper from "./MapContainer";
import { SEARCH_RESTAURANTS } from "../GraphQL/remoteQueries";
import { getMapPosition } from "../GraphQL/localQueries";
import { getSearchParameters } from "../GraphQL/localQueries";

class MapController extends Component {
  // Will be on the route search/results with lat and lon in the url

  componentDidMount = () => {
    console.log("THE PROPS INSIDE MAP CONTROLLER: ", this.props);
  };

  render() {
    const { latitude, longitude } = this.props.mapPosition;
    const {
      categories,
      cuisines,
      establishment,
      radius
    } = this.props.searchParameters;
    console.log("Props in MapController render: ", this.props);
    return (
      <GoogleApiWrapper
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

// READ DOCS TO SEE IF YOU CAN FIRE THE MUTATION USING COMPOSE AND GRAPHQL FUNCTIONS
// TO LAUNCH OF SEARCH RESTAURANTS UPON MAP CONTROLLER MOUNTING
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
