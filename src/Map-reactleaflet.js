import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

function NewMarker() {
  const [position, setPosition] = useState([]);
  const map = useMapEvent("click", (e) => {
    // console.log(e);
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
  });
  if (position.length === 0) {
    return null;
  }
  return (
    <Marker position={position}>
      <Popup autoClose={false}>Workout</Popup>
    </Marker>
  );
}

export default function Map() {
  const [coords, setCoords] = useState([]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCoords([latitude, longitude]);
        },
        () => {
          alert("Could Not Get Your Position!");
        }
      );
    }
  }, []);
  if (coords.length === 0) {
    return <div>loading</div>;
  }
  return (
    <MapContainer
      center={coords}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full"
      closePopupOnClick={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <NewMarker />
    </MapContainer>
  );
}
