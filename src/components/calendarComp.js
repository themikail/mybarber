import React, { useState } from "react";
import { db } from "../server/firebase";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Replace "#root" with the id of your root element

function CalendarComp() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null); // State for the selected time
  const [selectedService, setSelectedService] = useState(""); // State for the selected service
  const [note, setNote] = useState(""); // State for the user's note
  const [bookingStatus, setBookingStatus] = useState(null); // State for booking status message
  const [appointments, setAppointments] = useState([]);

  // Function to handle date change when a date is selected in the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true); // Open the modal when a date is selected
    setSelectedTime(null); // Reset selected time when the modal is opened
    setSelectedService(""); // Reset selected service when the modal is opened
    setNote(""); // Reset note when the modal is opened
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

  // Function to handle service selection from the dropdown
  const handleServiceSelection = (e) => {
    setSelectedService(e.target.value);
  };

  // Function to handle note input
  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };

  // Function to confirm the booking and save data to Firebase
  const confirmBooking = () => {
    if (selectedTime && selectedService) {
      const newBooking = {
        time: selectedTime,
        service: selectedService,
        note: note,
      };

      // Save the booking data to Firebase Realtime Database
      const newBookingRef = db.ref("bookings").push();
      newBookingRef
        .set(newBooking)
        .then(() => {
          setBookingStatus("Successfully booked!");
          setAppointments([
            ...appointments,
            { ...newBooking, key: newBookingRef.key },
          ]);
          console.log("Booking data saved:", newBooking);
        })
        .catch((error) => {
          setBookingStatus("Failed to book. Please try again later.");
          console.error("Error saving booking data:", error);
        });
    }
  };

  // Delete booking
  const handleDeleteAppointment = (key) => {
    db.ref(`bookings/${key}`)
      .remove()
      .then(() => {
        setAppointments(
          appointments.filter((appointment) => appointment.key !== key)
        );
        console.log("Appointment deleted:", key);
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  return (
    <div>
      <h1>My Barber</h1>
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

        <h2>Select Service</h2>
        <select onChange={handleServiceSelection}>
          <option value="">Select a service</option>
          <option value="Haircut">Haircut</option>
          <option value="Shave">Shave</option>
          <option value="Beard Trim">Beard Trim</option>
          {/* Add more service options as needed */}
        </select>

        <h2>Add a Note</h2>
        <textarea value={note} onChange={handleNoteInput} />

        <button onClick={confirmBooking}>Confirm</button>
        {bookingStatus && <p>{bookingStatus}</p>}
      </Modal>
      {/* Display the booked appointments */}
      <h2>Booked Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.key}>
            Time: {appointment.time}, Service: {appointment.service}, Note:{" "}
            {appointment.note}
            <button onClick={() => handleDeleteAppointment(appointment.key)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarComp;
