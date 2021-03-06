import React, { useState, useEffect } from "react";

export default function NewWorkout({ addHistory, addNewcoords, newcoords }) {
  const [newworkout, setNewworkout] = useState({
    type: "Running",
    duration: "",
    distance: "",
    cadence: 0,
  });
  const [warning, setWarning] = useState("");
  const onSubmitForm = (e) => {
    e.preventDefault();
    // validate distance
    if (parseFloat(newworkout.distance) <= 0) {
      setWarning("請輸入有效distance");
      return;
    }
    const pace = calcPace();

    if (newcoords.length === 0) {
      alert("請在地圖上點選地點！");
      return;
    }
    addHistory(
      newcoords,
      newworkout.type,
      newworkout.duration,
      //   newworkout.cadence,
      newworkout.distance,
      pace
    );

    addNewcoords([]);
  };
  const onChangeForm = (e) => {
    // console.log(e.target.name);
    setNewworkout({ ...newworkout, [e.target.name]: e.target.value });
  };
  // calc pace
  const calcPace = () => {
    return (newworkout.duration / newworkout.distance).toString().slice(0, 4);
  };
  //   validate input
  useEffect(() => {
    const validateInput = () => {
      if (parseFloat(newworkout.distance) <= 0) {
        setWarning("請輸入有效distance");
      } else {
        setWarning("");
      }
    };
    validateInput();
  }, [newworkout.distance]);

  return (
    <form className="flex flex-wrap" onSubmit={onSubmitForm}>
      <div className="w-full my-2 p-2">
        <label className="text-white inline-block w-1/2">Type</label>
        <select
          className="rounded px-2 py-2 focus:outline-none inline-block w-1/2"
          name="type"
          onChange={onChangeForm}
        >
          <option value="Running">Running</option>
          <option value="Cycling">Cycling</option>
        </select>
      </div>
      <div className="w-1/2 my-2 p-2">
        <label className="text-white inline-block w-1/2">Distance</label>
        <input
          type="number"
          className="rounded px-2 py-2 focus:outline-none inline-block w-1/2"
          value={newworkout.distance}
          placeholder="km"
          name="distance"
          onChange={onChangeForm}
        />
        <p className="text-red-500">{warning}</p>
      </div>
      <div className="w-1/2 my-2 p-2">
        <label className="text-white inline-block w-1/2">Duration</label>
        <input
          type="number"
          className="rounded px-2 py-2 focus:outline-none inline-block w-1/2"
          value={newworkout.duration}
          placeholder="min"
          name="duration"
          onChange={onChangeForm}
        />
      </div>
      {/* <div className="w-1/2 my-2 p-2">
        <label className="text-white inline-block w-1/2">Cadence</label>
        <input
          className="rounded px-2 focus:outline-none inline-block w-1/2"
          value={newworkout.cadence}
          placeholder="step/min"
          name="cadence"
          onChange={onChangeForm}
        />
      </div> */}
      <input
        type="submit"
        value="新增"
        className="m-auto my-2 px-6 py-1 rounded focus:outline-none cursor-pointer"
      />
    </form>
  );
}
