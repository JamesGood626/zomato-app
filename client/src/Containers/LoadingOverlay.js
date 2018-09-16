import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const OverlayDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #fcfcfc;
`;

const Loading = styled.h1`
  color: #fa5106;
`;

export default class LoadingOverlay extends Component {
  constructor(props) {
    super(props);
    this.loadingOverlay = document.createElement("div");
    document.body.appendChild(this.loadingOverlay);
  }

  componentWillUnmount = () => {
    document.body.removeChild(this.loadingOverlay);
  };

  render() {
    return ReactDOM.createPortal(
      <OverlayDiv>
        {this.props.geolocationUnavailable === null ? (
          <Loading>Loading...</Loading>
        ) : (
          <Loading>{this.props.geolocationUnavailable}</Loading>
        )}
      </OverlayDiv>,
      this.loadingOverlay
    );
  }
}
