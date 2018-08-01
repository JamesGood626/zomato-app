import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getSearchParameters } from "../GraphQL/localQueries";
import { updateSearchParameters } from "../GraphQL/localMutations";
import { DropDown } from "../Components/DropDown";
import { Select } from "../Components/Select";

// TODO: figure out what to display for loading and error states.
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
  };

  componentDidUpdate = () => {
    console.log("updated comp:", this.props.searchParameters);
  };

  updateSelectedOptions = e => {
    console.log("updateSelectedOptions: ", e.target);
    console.log("The target id: ", e.target.id); // "cuisine-select"/"establishment-select"
    console.log("The target value: ", e.target.value); // id which you'll be saving into state for query
    const { updateSearchParameters } = this.props;
    const id = e.target.id;
    let valueArray;
    let value;
    if (id === "categoryIDList" || id === "cuisineIDList") {
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
      case "categoryIDList":
        return updateSearchParameters({
          variables: {
            input: {
              index: id,
              value: valueArray
            }
          }
        });
      case "cuisineIDList":
        return updateSearchParameters({
          variables: {
            input: {
              index: id,
              value: valueArray
            }
          }
        });
      case "establishmentID":
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

  render() {
    return (
      <form>
        <Select
          id="categoryIDList"
          title="Categories"
          multiple={true}
          updateSelectedOptions={this.updateSelectedOptions}
        >
          <DropDown renderOptions={"categories"} />
        </Select>
        <Select
          id="cuisineIDList"
          title="Cuisines"
          multiple={true}
          updateSelectedOptions={this.updateSelectedOptions}
        >
          <DropDown renderOptions={"cuisines"} />
        </Select>
        <Select
          id="establishmentID"
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
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </Select>
        <button>Submit</button>
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
