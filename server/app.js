const express = require("express");

const app = express();
// middleware.initMiddleware(app);

module.exports = app;

// Geocoding API key
// "AIzaSyDddrhqaZyt3FvZjTxNqsvCdcNFZvzs73I"

// Request Url
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDddrhqaZyt3FvZjTxNqsvCdcNFZvzs73I

// Response
// {
//     "results": [
//         {
//             "address_components": [
//                 {
//                     "long_name": "1600",
//                     "short_name": "1600",
//                     "types": [
//                         "street_number"
//                     ]
//                 },
//                 {
//                     "long_name": "Amphitheatre Parkway",
//                     "short_name": "Amphitheatre Pkwy",
//                     "types": [
//                         "route"
//                     ]
//                 },
//                 {
//                     "long_name": "Mountain View",
//                     "short_name": "Mountain View",
//                     "types": [
//                         "locality",
//                         "political"
//                     ]
//                 },
//                 {
//                     "long_name": "Santa Clara County",
//                     "short_name": "Santa Clara County",
//                     "types": [
//                         "administrative_area_level_2",
//                         "political"
//                     ]
//                 },
//                 {
//                     "long_name": "California",
//                     "short_name": "CA",
//                     "types": [
//                         "administrative_area_level_1",
//                         "political"
//                     ]
//                 },
//                 {
//                     "long_name": "United States",
//                     "short_name": "US",
//                     "types": [
//                         "country",
//                         "political"
//                     ]
//                 },
//                 {
//                     "long_name": "94043",
//                     "short_name": "94043",
//                     "types": [
//                         "postal_code"
//                     ]
//                 }
//             ],
//             "formatted_address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
//             "geometry": {
//                 "location": {
//                     "lat": 37.4226231,
//                     "lng": -122.0845839
//                 },
//                 "location_type": "ROOFTOP",
//                 "viewport": {
//                     "northeast": {
//                         "lat": 37.42397208029149,
//                         "lng": -122.0832349197085
//                     },
//                     "southwest": {
//                         "lat": 37.42127411970849,
//                         "lng": -122.0859328802915
//                     }
//                 }
//             },
//             "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
//             "plus_code": {
//                 "compound_code": "CWF8+35 Mountain View, California, United States",
//                 "global_code": "849VCWF8+35"
//             },
//             "types": [
//                 "street_address"
//             ]
//         }
//     ],
//     "status": "OK"
// }
