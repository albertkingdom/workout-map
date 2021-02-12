import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Map from "./Map";
import WorkoutList from "./WorkoutList";

function App() {
  const [workouthistory, setWorkouthistory] = useState([
    // {
    //   position: [25, 121.4],
    //   type: "Walking",
    //   date: new Date(),
    //   distance: 3,
    //   duration: 40,
    //   cadence: 30,
    //   id: uuidv4(),
    // },
    // {
    //   position: [25, 121.6],
    //   type: "Walking",
    //   date: new Date(),
    //   distance: 2,
    //   duration: 40,
    //   cadence: 35,
    //   id: uuidv4(),
    // },
  ]);
  const [newcoords, setNewcoords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState();
  const addHistory = (coords, type, duration, distance, pace) => {
    setWorkouthistory([
      ...workouthistory,
      {
        position: coords,
        type,
        duration,
        date: new Date(),
        distance,
        pace,
        id: uuidv4(),
      },
    ]);
  };
  const addNewcoords = (coords) => {
    setNewcoords(coords);
  };
  const onSelectRecord = (recordId) => {
    // console.log("id", recordId);
    const record = workouthistory.find((item) => item.id === recordId);
    setSelectedRecord(record);
  };

  useEffect(() => {
    // save workout history to localstorage
    const setLocalstorage = () => {
      if (
        localStorage.getItem("workout") &&
        JSON.parse(localStorage.getItem("workout")).length <
          workouthistory.length
      ) {
        localStorage.setItem("workout", JSON.stringify(workouthistory));
      }

      localStorage.setItem("workout", JSON.stringify(workouthistory));
    };
    setTimeout(() => {
      setLocalstorage();
    }, 1000);
  }, [workouthistory]);

  useEffect(() => {
    // get workout from local storage
    const getLocalstorage = () => {
      const data = JSON.parse(localStorage.getItem("workout"));
      if (!data) return;
      setWorkouthistory(data);
    };
    getLocalstorage();
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <WorkoutList
        addHistory={addHistory}
        newcoords={newcoords}
        addNewcoords={addNewcoords}
        workouthistory={workouthistory}
        onSelectRecord={onSelectRecord}
      />
      <Map
        addNewcoords={addNewcoords}
        workouthistory={workouthistory}
        selectedRecord={selectedRecord}
      />
    </div>
  );
}

export default App;
