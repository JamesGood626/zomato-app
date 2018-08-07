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

const mapCategoriesData = (allCategories, updateSelectedOptions) => {
  console.log("MAPPING CATEGORIES: ", allCategories);
  return (
    <select id="categories" onChange={updateSelectedOptions} multiple>
      {allCategories.categories.map(({ categories: { id, name } }) => (
        <option key={id} value={id}>{`${name}`}</option>
      ))}}
    </select>
  );
};

const mapCuisineData = (allCuisines, updateSelectedOptions) => {
  return (
    <select id="cuisines" onChange={updateSelectedOptions} multiple>
      {allCuisines.cuisines.map(({ cuisine: { cuisine_id, cuisine_name } }) => (
        <option key={cuisine_id} value={cuisine_id}>{`${cuisine_name}`}</option>
      ))}
    </select>
  );
};

const mapEstablishmentData = (allEstablishments, updateSelectedOptions) => {
  return (
    <select id="establishment" onChange={updateSelectedOptions}>
      {allEstablishments.establishments.map(
        ({ establishment: { id, name } }) => (
          <option key={id} value={id}>{`${name}`}</option>
        )
      )}
    </select>
  );
};

export const DropDownComposed = ({
  latitude,
  longitude,
  updateSelectedOptions
}) => {
  return (
    <Query query={GET_CATEGORIES}>
      {({ loading: loadingCategories, data: { allCategories } }) => (
        <Query query={GET_CUISINES}>
          {({ loading: loadingCuisines, data: { allCuisines } }) => (
            <Query
              query={GET_ESTABLISHMENTS}
              variables={{ latitude, longitude }}
            >
              {({
                loading: loadingEstablishments,
                data: { allEstablishments }
              }) => {
                if (
                  loadingCategories ||
                  loadingCuisines ||
                  loadingEstablishments
                ) {
                  console.log("loading...");
                  return <LoadingOverlay />;
                }
                console.log("loadingCategories: ", loadingCategories);
                console.log("loadingCuisines: ", loadingCuisines);
                console.log("loadingEstablishments: ", loadingEstablishments);
                console.log("allCategories: ", allCategories);
                console.log("allCuisines: ", allCuisines);
                console.log("allEstablishments: ", allEstablishments);
                if (
                  loadingCategories ||
                  loadingCuisines ||
                  loadingEstablishments
                ) {
                  console.log("loading...");
                  return <LoadingOverlay />;
                }
                console.log("MAKING IT TO THE RETURN...");
                return (
                  <Fragment>
                    {mapCategoriesData(allCategories, updateSelectedOptions)}
                    {mapCuisineData(allCuisines, updateSelectedOptions)}
                    {mapEstablishmentData(
                      allEstablishments,
                      updateSelectedOptions
                    )}
                  </Fragment>
                );
              }}
            </Query>
          )}
        </Query>
      )}
    </Query>
  );
};

{
  /* <Query query={GET_CATEGORIES}>
  {({ loadingCategories, errorCategories, data: { allCategories } }) => (
    <Query query={GET_CUISINES}>
      {({ loadingCuisines, errorCuisines, data: { allCuisines } }) => {
        <Query query={GET_ESTABLISHMENTS} variables={{ latitude, longitude }}>
          {({
            loadingEstablishments,
            errorEstablishments,
            data: { allEstablishments }
          }) => {
            if (loadingCategories || loadingCuisines || loadingEstablishments) {
              console.log("loading...");
              return <LoadingOverlay />;
            }
            if (errorCategories || errorCuisines || errorEstablishments) {
              if (errorCategories) {
                return errorLoadingOptions(errorCategories);
              } else if (errorCuisines) {
                return errorLoadingOptions(errorCuisines);
              } else if (errorEstablishments) {
                return errorLoadingOptions(errorEstablishments);
              }
            }
            return (
              <Fragment>
                {mapCategoriesData(allCategories)}
                {mapCuisineData(allCuisines)}
                {mapEstablishmentData(allEstablishments)}
              </Fragment>
            );
          }}
        </Query>;
      }}
    </Query>
  )}
</Query>; */
}
