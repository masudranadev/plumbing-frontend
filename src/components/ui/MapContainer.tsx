"use client";
import GoogleMapReact from "google-map-react";


const MapContainer = () => {
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 8
      };
  return (
    <div style={{ height: '70vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: "" }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
    </GoogleMapReact>
  </div>
  );
};

export default MapContainer;
