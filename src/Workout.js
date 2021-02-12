import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faRunning,
  faWalking,
  faBolt,
  faBiking,
} from "@fortawesome/free-solid-svg-icons";

export default function Workout({ record, onSelectRecord }) {
  const { type, date, distance, duration, pace, id } = record;

  return (
    <li className="bg-secondary">
      <div
        className={`w-full border-l-4 ${
          type === "Walking" ? "border-green-700" : ""
        } ${type === "Running" ? "border-yellow-600" : ""} ${
          type === "Cycling" ? "border-yellow-300" : ""
        } my-3 p-3 shadow rounded`}
        onClick={() => onSelectRecord(id)}
      >
        <h1 className="text-white text-xl">
          {`${type} on ${new Date(date).getFullYear()}-${
            new Date(date).getMonth() + 1
          }-${new Date(date).getDate()}`}
        </h1>
        <ul className="flex ">
          <li className="text-white flex-grow">
            <span className="mx-2">
              {type === "Running" && <FontAwesomeIcon icon={faRunning} />}
              {type === "Walking" && <FontAwesomeIcon icon={faWalking} />}
              {type === "Cycling" && <FontAwesomeIcon icon={faBiking} />}
            </span>
            {distance}km
          </li>
          <li className="text-white flex-grow">
            <span className="mx-2">{<FontAwesomeIcon icon={faClock} />}</span>
            {duration}min
          </li>
          <li className="text-white flex-grow">
            <span className="mx-2">{<FontAwesomeIcon icon={faBolt} />}</span>
            {pace}min/km
          </li>
          {/* <li className="text-white flex-grow">SPM</li> */}
        </ul>
      </div>
    </li>
  );
}
