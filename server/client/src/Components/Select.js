import React, { Fragment } from "react";
import styled from "styled-components";
// WIll need to add the styles so that the title will appear above
// the regular drop down.

const StyledSelect = styled.select`
  font-size: 1.1rem;
  border-radius: 0;

  &:focus {
    outline: none;
    border: 2px solid #fa5106;
  }
`;

export const Select = ({
  children,
  id,
  title,
  multiple,
  updateSelectedOptions
}) => {
  return (
    <Fragment>
      <label htmlFor={`${id}`}>{title}</label>
      <StyledSelect
        id={`${id}`}
        multiple={multiple}
        onChange={updateSelectedOptions}
      >
        {children}
      </StyledSelect>
    </Fragment>
  );
};
