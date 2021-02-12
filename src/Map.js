import React, { useEffect, useState, useRef } from "react";
// import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Map({ addNewcoords, workouthistory, selectedRecord }) {
  const [coords, setCoords] = useState([25, 121]);

  const mapRef = useRef();

  useEffect(() => {
    //   取得經緯度
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
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
  useEffect(() => {
    //   初始化map
    let map = L.map("mapid");
    mapRef.current = map;
  }, []);
  useEffect(() => {
    mapRef.current.setView(coords, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);
  }, [coords]);
  useEffect(() => {
    // let markersList = [];
    // workouthistory.forEach((element) => {
    //   let marker = L.marker(element.position)
    //     .bindPopup(element.type)
    //     .setPopupContent(`${element.type} on ${element.date.toLocaleString()}`)
    //     .openPopup();
    //   markersList.push(marker);
    // });
    // let markerslayer = L.layerGroup(markersList);
    // markerslayer.clearLayers();
    // L.control.layers(null, { markers: markerslayer }).addTo(mapRef.current);
  }, [workouthistory]);

  //   創造layer group
  let markersLayer;

  if (mapRef.current) {
    markersLayer = L.layerGroup().addTo(mapRef.current);
  }
  useEffect(() => {
    if (markersLayer) {
      markersLayer.clearLayers();

      workouthistory.forEach((element) => {
        let marker = L.marker(element.position)
          .bindPopup(element.type)
          .setPopupContent(
            `${element.type} on ${new Date(element.date).getFullYear()}-${
              new Date(element.date).getMonth() + 1
            }-${new Date(element.date).getDate()}`
          )
          .openPopup()
          .addTo(markersLayer);
      });
    }
  }, [workouthistory, markersLayer]);
  useEffect(() => {
    // workouthistory.forEach((element) => {
    //   L.marker(element.position)
    //     .addTo(mapRef.current)
    //     .bindPopup(element.type)
    //     .setPopupContent(`${element.type} on ${element.date.toLocaleString()}`)
    //     .openPopup();
    // });
  }, [workouthistory]);

  useEffect(() => {
    // click map will get location
    mapRef.current.on("click", function (e) {
      const { lat, lng } = e.latlng;
      addNewcoords([lat, lng]);
    });
  }, [addNewcoords]);
  useEffect(() => {
    //   onclick record, move view to marker
    if (selectedRecord) {
      mapRef.current.setView(selectedRecord.position, 12, {
        animate: true,
        pan: {
          duration: 1,
        },
      });
    }
  }, [selectedRecord]);

  //   useEffect(() => {
  //     //   新增一筆資料後在地圖上加marker
  //     if (workouthistory.length === 0) return;
  //     L.marker(workouthistory[workouthistory.length - 1].position)
  //       .addTo(mapRef.current)
  //       .bindPopup(
  //         L.popup({
  //           maxWidth: 250,
  //           autoClose: false,
  //           closeOnClick: false,
  //           className: "running",
  //         })
  //       )
  //       .setPopupContent(
  //         `${workouthistory[workouthistory.length - 1].type} on ${workouthistory[
  //           workouthistory.length - 1
  //         ].date.toLocaleString()}`
  //       )
  //       .openPopup();
  //   }, [workouthistory]);

  return <div id="mapid" className="h-full w-full"></div>;
}
