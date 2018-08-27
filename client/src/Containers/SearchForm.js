import React, { Component } from "react";
import styled from "styled-components";
import { graphql, compose } from "react-apollo";
import { SEARCH_RESTAURANTS } from "../GraphQL/remoteQueries";
import { getSearchParameters } from "../GraphQL/localQueries";
import { updateSearchParameters } from "../GraphQL/localMutations";
import { DropDown } from "../Components/DropDown";
import { DropDownComposed } from "../Components/DropDownComposed";
import SearchRadius from "../Components/searchRadius";
import Geocoder from "../Components/Geocoder";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 32rem;
  width: 30vw;
  min-width: 18rem;
  max-width: 28rem;
  background: #fcfcfc;
`;

const Button = styled.button`
  width: 10rem;
  height: 2.6rem;
  font-size: 1.2rem;
  color: #fcfcfc;
  border: none;
  background: #fa5106;
`;
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
    console.log("The props after update: ", this.props);
  };

  // you can use this with the accessible drop down, but you'll just need to pass in the
  // instance id and the option selected as value.
  updateSelectedOptions = e => {
    const { updateSearchParameters } = this.props;
    const id = e.target.id;
    let valueArray;
    let value;
    if (id === "categories" || id === "cuisines") {
      valueArray = Array.prototype.slice
        .call(e.target.querySelectorAll(":checked"))
        .map(option => {
          console.log(
            "This is one of the selected options value: ",
            option.value
          );
          return option.value;
        });
    } else {
      value = e.target.value;
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

  render() {
    return (
      <Form>
        <DropDownComposed
          latitude={this.props.latitude}
          longitude={this.props.longitude}
          updateSelectedOptions={this.updateSelectedOptions}
        />
        <Geocoder google={this.props.google} />
        <Button onClick={this.redirectToMap}>Search</Button>
      </Form>
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
