import React, { Fragment } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import {
  GET_CATEGORIES,
  GET_CUISINES,
  GET_ESTABLISHMENTS
} from "../GraphQL/remoteQueries";
import LoadingOverlay from "../Containers/LoadingOverlay";

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 14rem;

  label {
    margin-bottom: 0.4rem;
    font-size: 1.4rem;
    color: #999;
  }
`;

const Select = styled.select`
  font-size: 1.1rem;
  border-radius: 0;

  &:focus {
    outline: none;
    border: 2px solid #fa5106;
  }
`;

const MultiSelect = styled.select`
  height: 5rem;
  width: 14rem;
  font-size: 1.1rem;
  background: #fcfcfc;

  &:focus {
    outline: none;
    border: 2px solid #fa5106;
  }
`;

// const stillLoading = () => {
//   console.log("still loading...");
//   return null;
// };

// const errorLoadingOptions = error => {
//   console.log("Error loading options: ", error);
//   return null;
// };

const mapCategoriesData = (allCategories, updateSelectedOptions) => {
  return (
    <SelectContainer>
      <label labelfor="categories">Categories:</label>
      <MultiSelect id="categories" onChange={updateSelectedOptions} multiple>
        {allCategories.categories.map(({ categories: { id, name } }) => (
          <option key={id} value={id}>{`${name}`}</option>
        ))}
        }
      </MultiSelect>
    </SelectContainer>
  );
};

const mapCuisineData = (allCuisines, updateSelectedOptions) => {
  return (
    <SelectContainer>
      <label labelfor="cuisines">Cuisines:</label>
      <MultiSelect id="cuisines" onChange={updateSelectedOptions} multiple>
        {allCuisines.cuisines.map(
          ({ cuisine: { cuisine_id, cuisine_name } }) => (
            <option
              key={cuisine_id}
              value={cuisine_id}
            >{`${cuisine_name}`}</option>
          )
        )}
      </MultiSelect>
    </SelectContainer>
  );
};

const mapEstablishmentData = (allEstablishments, updateSelectedOptions) => {
  return (
    <SelectContainer>
      <label labelfor="establishment">Establishment:</label>
      <Select id="establishment" onChange={updateSelectedOptions}>
        {allEstablishments.establishments.map(
          ({ establishment: { id, name } }) => (
            <option key={id} value={id}>{`${name}`}</option>
          )
        )}
      </Select>
    </SelectContainer>
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
                  return <LoadingOverlay />;
                }
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
