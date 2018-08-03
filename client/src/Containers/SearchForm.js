import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { SEARCH_RESTAURANTS } from "../GraphQL/remoteQueries";
import { getSearchParameters } from "../GraphQL/localQueries";
import { updateSearchParameters } from "../GraphQL/localMutations";
import { DropDown } from "../Components/DropDown";
import { Select } from "../Components/Select";

// Moreso the error state, as I'll be using a loading spinner before data is fetched.

// Will change updateSelectedOptions to only fire off when submit is fired. Which will trigger the redirect/search

// TODO:
// fire off the query for restaurant search and utilize the values in
// this.props.searchParameters for the query variables
class SearchForm extends Component {
  componentDidMount = () => {
    console.log(
      "The search parameters from apollo-link-state: ",
      this.props.searchParameters
    );
    console.log("searchRestaurants: ", this.props.searchRestaurants);
    console.log("props.submit: ", this.props.submit);
    // this.props.history.push("/");
  };

  componentDidUpdate = () => {
    // console.log("updated comp:", this.props.searchParameters);
    // console.log(
    //   "searchRestaurants after update: ",
    //   this.props.searchRestaurants
    // );
    console.log("The props after update: ", this.props);
  };

  updateSelectedOptions = e => {
    console.log("updateSelectedOptions: ", e.target);
    console.log("The target id: ", e.target.id); // "cuisine-select"/"establishment-select"
    console.log("The target value: ", e.target.value); // id which you'll be saving into state for query
    const { updateSearchParameters } = this.props;
    const id = e.target.id;
    let valueArray;
    let value;
    if (id === "categories" || id === "cuisines") {
      valueArray = Array.prototype.slice
        .call(e.target.querySelectorAll(":checked"))
        .map(option => {
          // option.value obtains the id you need
          console.log(
            "This is one of the selected options value: ",
            option.value
          );
          return option.value;
        });
    } else {
      value = e.target.value;
      console.log("THE VALUE: ", value);
    }
    switch (id) {
      case "categories":
        return updateSearchParameters({
          variables: {
            input: {
              index: id,
              value: valueArray
            }
          }
        });
      case "cuisines":
        return updateSearchParameters({
          variables: {
            input: {
              index: id,
              value: valueArray
            }
          }
        });
      case "establishment":
        return updateSearchParameters({
          variables: {
            input: {
              index: id,
              value
            }
          }
        });
      case "radius":
        return updateSearchParameters({
          variables: {
            input: {
              index: id,
              value
            }
          }
        });
    }
  };

  redirectToMap = e => {
    e.preventDefault();
    this.props.history.push("/map");
  };

  // startSearchRestaurants = e => {
  //   e.preventDefault();
  //   const { searchParameters, submit, latitude, longitude } = this.props;
  //   const {
  //     categoryIDList,
  //     cuisineIDList,
  //     establishmentID,
  //     radius
  //   } = searchParameters;
  //   const input = {};
  //   if (categoryIDList.length !== 0) input.categories = categoryIDList;
  //   if (cuisineIDList.length !== 0) input.cuisines = cuisineIDList;
  //   if (establishmentID !== null) input.establishment = establishmentID;
  //   if (radius !== null) input.radius = radius;
  //   // console.log("Search parameters in submit: ", input);
  //   submit({ latitude, longitude, input });
  // };

  render() {
    return (
      <form>
        <Select
          id="categories"
          title="Categories"
          multiple={true}
          updateSelectedOptions={this.updateSelectedOptions}
        >
          <DropDown renderOptions={"categories"} />
        </Select>
        <Select
          id="cuisines"
          title="Cuisines"
          multiple={true}
          updateSelectedOptions={this.updateSelectedOptions}
        >
          <DropDown renderOptions={"cuisines"} />
        </Select>
        <Select
          id="establishment"
          title="Establishments"
          updateSelectedOptions={this.updateSelectedOptions}
        >
          <DropDown
            renderOptions={"establishments"}
            latitude={this.props.latitude}
            longitude={this.props.longitude}
          />
        </Select>
        <Select
          id="radius"
          title="Radius"
          updateSelectedOptions={this.updateSelectedOptions}
        >
          <option value="20000">20000</option>
          <option value="30000">30000</option>
          <option value="40000">40000</option>
          <option value="50000">50000</option>
          <option value="60000">60000</option>
        </Select>
        <button onClick={this.redirectToMap}>Submit</button>
      </form>
    );
  }
}

export default compose(
  graphql(updateSearchParameters, { name: "updateSearchParameters" }),
  graphql(getSearchParameters, {
    props: ({ data: { searchParameters } }) => ({
      searchParameters
    })
  })
)(SearchForm);
