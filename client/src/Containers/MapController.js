import React, { Component } from "react";

export default class MapController extends Component {
  // Will be on the route search/results with lat and lon in the url
  render() {
    return <GoogleApiWrapper lat={latitude} lon={longitude} />;
  }
}
