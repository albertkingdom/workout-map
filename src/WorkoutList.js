import React from "react";
import Workout from "./Workout";
import NewWorkout from "./NewWorkout";
export default function WorkoutList({
  addHistory,
  newcoords,
  addNewcoords,
  workouthistory,
  onSelectRecord,
}) {
  return (
    <div className="bg-primary">
      <ul className="p-5">
        <li className="bg-secondary p-3 rounded">
          <NewWorkout
            addHistory={addHistory}
            newcoords={newcoords}
            addNewcoords={addNewcoords}
          />
        </li>

        {workouthistory?.map((record) => (
          <Workout
            record={record}
            onSelectRecord={onSelectRecord}
            key={record.id}
          />
        ))}
      </ul>
    </div>
  );
}
