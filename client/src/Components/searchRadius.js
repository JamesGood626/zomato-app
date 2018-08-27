import React from "react";
import styled from "styled-components";
import { Select } from "./Select";

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

export default ({ updateSelectedOptions }) => {
  return (
    <SelectContainer>
      <Select
        id="radius"
        title="Radius"
        updateSelectedOptions={updateSelectedOptions}
      >
        <option value="8046.72">5 miles</option>
        <option value="16093.4">10 miles</option>
        <option value="24140.2">15 miles</option>
        <option value="32186.9">20 miles</option>
        <option value="40233.6">25 miles</option>
        <option value="48280.3">30 miles</option>
        <option value="56327">35 miles</option>
        <option value="64373.8">40 miles</option>
        <option value="72420.5">45 miles</option>
        <option value="80467.2">50 miles</option>
      </Select>
    </SelectContainer>
  );
};
