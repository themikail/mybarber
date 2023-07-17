import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";

function CalendarComp() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null); // State for the selected time
  const [bookingStatus, setBookingStatus] = useState(null); // State for booking status message

  // Function to handle date change when a date is selected in the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true); // Open the modal when a date is selected
    setSelectedTime(null); // Reset selected time when the modal is opened
    setBookingStatus(null); // Reset booking status when the modal is opened
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to set the selected time
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  // Function to confirm the booking and show the success message
  const confirmBooking = () => {
    if (selectedTime) {
      setBookingStatus("Successfully booked!"); // Set the success message
    }
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Select Time"
      >
        <h2>Select Time</h2>
        {/* Here you can implement a component or logic for time selection */}
        {/* For example, a dropdown list for time options */}
        <select onChange={(e) => handleTimeSelection(e.target.value)}>
          <option value="08:00">08:00</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          {/* Add more time options as needed */}
        </select>
        <button onClick={confirmBooking}>Confirm</button>
        {bookingStatus && <p>{bookingStatus}</p>}
      </Modal>
    </div>
  );
}

export default CalendarComp;
