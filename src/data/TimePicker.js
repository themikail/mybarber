import React from "react";

function TimePicker({ selectedTime, handleTimeSelection, bookedTimes }) {
  const isTimeBooked = (time) => {
    return bookedTimes.includes(time);
  };

  return (
    <div>
      <h2>Select Time</h2>
      <select
        onChange={(e) => handleTimeSelection(e.target.value)}
        value={selectedTime}
      >
        <option value="">Select a time</option>
        <option value="08:00" disabled={isTimeBooked("08:00")}>
          08:00
        </option>
        <option value="09:00" disabled={isTimeBooked("09:00")}>
          09:00
        </option>
        <option value="10:00" disabled={isTimeBooked("10:00")}>
          10:00
        </option>
        <option value="11:00" disabled={isTimeBooked("11:00")}>
          11:00
        </option>
      </select>
    </div>
  );
}

export default TimePicker;
