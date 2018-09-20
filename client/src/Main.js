import React, { Component } from "react";
// import { graphql, compose } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import InitialSearch from "./Containers/InitialSearch";
import MapController from "./Containers/MapController";
import AriaListbox from "./AriaListbox";

// Overview of application flow
// Initial search renders Select and DropDown options for restaurant search parameters.
// User can either enter parameters (or change the address of where to search when I add Geolocation functionality)
// or just hit search and it'll search the surrounding area automatically for food spots.
// When the submit button in InitialSearch is clicked. this.props.history.push('/map') occurs
// to mount MapController, which is utilizing react-apollos compose and graphql functions, which automatically
// assign the requested data from local cache and inject those values into MapController's props.
// From there MapController passes those props to MapContainer, which then utilizes those props in the Query component to
// begin fetching allRestaurants. It's so beautiful.
class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={InitialSearch} />
          <Route path="/map" component={MapController} />
          <Route path="/drop-down" component={AriaListbox} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
