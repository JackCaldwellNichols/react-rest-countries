/* eslint-disable react/prop-types */
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";

const MapBox = ({ latlng }) => {
  const [viewState, setViewState] = useState({
    longitude: latlng[1],
    latitude: latlng[0],
    zoom: 2,
  });

  return (
    <Container style={{ height: "50vh", width: "100vw" }} className="p-0 my-5">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/outdoors-v9"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        latitude={latlng[0]}
        longitude={latlng[1]}
        style={{ height: "100%", width: "100%", borderRadius: "30px" }}
      >
        <Marker longitude={latlng[1]} latitude={latlng[0]} anchor="bottom" />
      </Map>
    </Container>
  );
};

export default MapBox;
