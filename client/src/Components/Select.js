import React, { Fragment } from "react";

// WIll need to add the styles so that the title will appear above
// the regular drop down.

export const Select = ({
  children,
  id,
  title,
  multiple,
  updateSelectedOptions
}) => {
  return (
    <Fragment>
      <label htmlFor={`${id}-select`}>
        <select
          id={`${id}-select`}
          multiple={multiple}
          onChange={updateSelectedOptions}
        >
          {children}
        </select>
        <span>{title}</span>
      </label>
    </Fragment>
  );
};
