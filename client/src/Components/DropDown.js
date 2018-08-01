import React, { Fragment } from "react";
import { Query } from "react-apollo";
import {
  GET_CATEGORIES,
  GET_CUISINES,
  GET_ESTABLISHMENTS
} from "../GraphQL/remoteQueries";
import LoadingOverlay from "../Containers/LoadingOverlay";

const stillLoading = () => {
  console.log("still loading...");
  return null;
};

const errorLoadingOptions = error => {
  console.log("Error loading options: ", error);
  return null;
};

const mapCategoriesData = data => {
  return data.allCategories.categories.map(({ categories: { id, name } }) => (
    <option key={id} value={id}>{`${name}`}</option>
  ));
};

const getCategoryOptions = () => {
  return (
    <Query query={GET_CATEGORIES}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return errorLoadingOptions(error);
        if (data) {
          // Call passed down prop func to indicate loading finished
          return mapCategoriesData(data);
        }
      }}
    </Query>
  );
};

const mapCuisineData = data => {
  return data.allCuisines.cuisines.map(
    ({ cuisine: { cuisine_id, cuisine_name } }) => (
      <option key={cuisine_id} value={cuisine_id}>{`${cuisine_name}`}</option>
    )
  );
};

const getCuisineOptions = () => {
  return (
    <Query query={GET_CUISINES}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return errorLoadingOptions(error);
        if (data) {
          return mapCuisineData(data);
        }
      }}
    </Query>
  );
};

const mapEstablishmentData = data => {
  return data.allEstablishments.establishments.map(
    ({ establishment: { id, name } }) => (
      <option key={id} value={id}>{`${name}`}</option>
    )
  );
};

const getEstablishmentOptions = ({ latitude, longitude }) => {
  return (
    <Query query={GET_ESTABLISHMENTS} variables={{ latitude, longitude }}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingOverlay />;
        if (error) return errorLoadingOptions(error);
        return mapEstablishmentData(data);
      }}
    </Query>
  );
};

export const DropDown = ({ renderOptions, latitude, longitude }) => {
  return (
    <Fragment>
      {renderOptions === "categories" ? (
        <Fragment>{getCategoryOptions()}</Fragment>
      ) : null}
      {renderOptions === "cuisines" ? (
        <Fragment>{getCuisineOptions()}</Fragment>
      ) : null}
      {renderOptions === "establishments" ? (
        <Fragment>{getEstablishmentOptions({ latitude, longitude })}</Fragment>
      ) : null}
    </Fragment>
  );
};
