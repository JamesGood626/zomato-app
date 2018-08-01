import React, { Component } from "react";
import styled from "styled-components";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { googleMapsKey } from "../Config";

const Div = styled.div`
  height: 100vh;
  width: 100vw;
`;

// Remember to go back to that fullstack react blog post that covers how this lib was created.
// Lots of gold in there if you have the patience.

export class MapContainer extends Component {
  // componentDidMount() {
  //   console.log(this.props.lat + " " + this.props.lon);
  //   console.log(this.props.google);
  // }
  render() {
    return (
      <Div>
        <Map
          google={this.props.google}
          // center={{ lat: this.props.lat, lng: this.props.lon }}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lon
          }}
          zoom={14}
        />
      </Div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleMapsKey
})(MapContainer);

// How you'll add Markers for the restaurant
{
  /* <Map google={this.props.google}
    style={{width: '100%', height: '100%', position: 'relative'}}
    className={'map'}
    zoom={14}>
  <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: 37.778519, lng: -122.405640}} />
  <Marker
    name={'Dolores park'}
    position={{lat: 37.759703, lng: -122.428093}} />
  <Marker />
  <Marker
    name={'Your position'}
    position={{lat: 37.762391, lng: -122.439192}}
    icon={{
      url: "/path/to/custom_icon.png",
      anchor: new google.maps.Point(32,32),
      scaledSize: new google.maps.Size(64,64)
    }} />
</Map> */
}

/***************
* THE MARKET COMPONENT'S EVENTS
***************/

// Events
// The <Marker /> component listens for events, similar to the <Map /> component.

// onClick
// You can listen for an onClick event with the (appropriately named) onClick prop.

// onMarkerClick(props, marker, e) {
//   // ..
// }

// render() {
//   return (
//     <Map google={this.props.google}>
//       <Marker onClick={this.onMarkerClick}
//           name={'Current location'} />
//     </Map>
//   )
// }

/***************
 * WHYYY POLYGON WHYYY
 ***************/
// What's this for?
// Polygon
// To place a polygon on the Map, set <Polygon /> as child of Map component.

// render() {
//   const triangleCoords = [
//     {lat: 25.774, lng: -80.190},
//     {lat: 18.466, lng: -66.118},
//     {lat: 32.321, lng: -64.757},
//     {lat: 25.774, lng: -80.190}
//   ];

//   return(
//     <Map google={this.props.google}
//         style={{width: '100%', height: '100%', position: 'relative'}}
//         className={'map'}
//         zoom={14}>
//         <Polygon
//           paths={triangleCoords}
//           strokeColor="#0000FF"
//           strokeOpacity={0.8}
//           strokeWeight={2}
//           fillColor="#0000FF"
//           fillOpacity={0.35} />
//     </Map>
//   )
// }
// Events
// The <Polygon /> component listens to onClick, onMouseover and onMouseout events.

/******************
 * THE LAST PIECE TO THE PUZZLE: INFOWINDOW COMPONENT
 *****************/

// InfoWindow
// The <InfoWindow /> component included in this library is gives us the ability to pop up a "more info" window on our Google map.

// The visibility of the <InfoWindow /> component is controlled by a visible prop. The visible prop is a boolean (PropTypes.bool) that shows the <InfoWindow /> when true and hides it when false.

// There are two ways how to control a position of the <InfoWindow /> component. You can use a position prop or connect the <InfoWindow /> component directly to an existing <Marker /> component by using a marker prop.

// //note: code formatted for ES6 here
// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {},
//   };

//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });

//   onMapClicked = (props) => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       })
//     }
//   };

//   render() {
//     return (
//       <Map google={this.props.google}
//           onClick={this.onMapClicked}>
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />

//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}>
//             <div>
//               <h1>{this.state.selectedPlace.name}</h1>
//             </div>
//         </InfoWindow>
//       </Map>
//     )
//   }
// }
// Events
// The <InfoWindow /> throws events when it's showing/hiding. Every event is optional and can accept a handler to be called when the event is fired.

// <InfoWindow
//   onOpen={this.windowHasOpened}
//   onClose={this.windowHasClosed}
//   visible={this.state.showingInfoWindow}>
//     <div>
//       <h1>{this.state.selectedPlace.name}</h1>
//     </div>
// </InfoWindow>
// onClose
// The onClose event is fired when the <InfoWindow /> has been closed. It's useful for changing state in the parent component to keep track of the state of the <InfoWindow />.

// onOpen
// The onOpen event is fired when the window has been mounted in the Google map instance. It's useful for keeping track of the state of the <InfoWindow /> from within the parent component.

// The GoogleApiWrapper automatically passes the google instance loaded when the component mounts (and will only load it once).
