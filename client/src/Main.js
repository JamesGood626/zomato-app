import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import InitialSearch from "./Containers/InitialSearch";
import { Home } from "./home";
import MapController from "./Containers/MapController";

// I'll have to create a component for the initial query
// As this component will be responsible for routing
class Main extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    console.log("This is the props in Main: ", this.props);
  };

  render() {
    // const { latitude, longitude } = this.props.mapPosition;
    // const {
    //   categories,
    //   cuisines,
    //   establishment,
    //   radius
    // } = this.props.searchParameters;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/initial-search" component={InitialSearch} />
          <Route path="/map" component={MapController} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;

// export default compose(
//   graphql(getMapPosition, {
//     props: ({ data: { mapPosition } }) => ({
//       mapPosition
//     })
//   }),
//   graphql(getSearchParameters, {
//     props: ({ data: { searchParameters } }) => ({
//       searchParameters
//     })
//   })
// )(Main);

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
