import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import InitialSearch from "./Containers/InitialSearch";
import { Home } from "./home";
import { MapContainer } from "./Containers/MapContainer";

// I'll have to create a component for the initial query
// As this component will be responsible for routing
class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/initial-search" component={InitialSearch} />
          <Route path="/map" component={MapContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;

// Just save these queries for a sub component which will comprise the dropdown options

// {
//             allCuisines {
//               cuisines {
//                 cuisine {
//                   cuisine_id
//                   cuisine_name
//                 }
//               }
//             }
//           }

/* <h2>Cuisines</h2>;
return data.allCuisines.cuisines.map(({ cuisine }) => (
  <div key={cuisine.cuisine_id}>
    <p>{`${cuisine.cuisine_name}`}</p>
  </div>
)); */
