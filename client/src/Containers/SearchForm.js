import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getSearchParameters } from "../GraphQL/localQueries";
import { DropDown } from "../Components/DropDown";
import { Select } from "../Components/Select";

// TODO: figure out what to display for loading and error states.
// Moreso the error state, as I'll be using a loading spinner before data is fetched.

// Will change updateSelectedOptions to only fire off when submit is fired. Which will trigger the redirect/search

// TODO:
// manage state for options which are selected.
// loading screen before all graphql queries have finished
// ForAbove (This will require obtaining lat and lon before allEstablishments may be queried)
// Need to determine the rest of the Apollo Client structure and how I'll manage the query
// that gets fired off when submit in SearchForm is clicked.
class SearchForm extends Component {
  componentDidMount = () => {
    console.log(
      "The search parameters from apollo-link-state: ",
      this.props.searchParameters
    );
  };

  updateSelectedOptions = e => {
    console.log("updateSelectedOptions: ", e.target);
    console.log("The target id: ", e.target.id); // "cuisine-select"/"establishment-select"
    console.log("The target value: ", e.target.value); // id which you'll be saving into state for query
    // This does indeed turn the HTMLCollection into an array which can be
    // mapped over...
    Array.prototype.slice
      .call(e.target.querySelectorAll(":checked"))
      .map(option => {
        // option.value obtains the id you need
        console.log("This is one of the selected options: ", option);
      });
  };

  render() {
    return (
      <form>
        <Select
          id="category"
          title="Categories"
          multiple={true}
          updateSelectedOptions={this.updateSelectedOptions}
        >
          <DropDown renderOptions={"categories"} />
        </Select>
        <Select
          id="cuisine"
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
  graphql(getSearchParameters, {
    props: ({ data: { searchParameters } }) => ({
      searchParameters
    })
  })
)(SearchForm);
