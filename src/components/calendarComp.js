import React, { useState, useEffect } from "react";
import { db } from "../server/firebase";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function CalendarComp({ user }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [note, setNote] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);

  // Load booked times from Firebase when the component mounts
  useEffect(() => {
    const bookedTimesRef = db.ref("bookedTimes");
    bookedTimesRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBookedTimes(data);
      }
    });
  }, []);

  useEffect(() => {
    // If the selected date changes, reset the selected time.
    setSelectedTime(null);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    setSelectedService("");
    setNote("");
    setBookingStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleServiceSelection = (e) => {
    setSelectedService(e.target.value);
  };

  const handleNoteInput = (e) => {
    setNote(e.target.value);
  };

  const confirmBooking = () => {
    if (selectedTime && selectedService && user) {
      const newBooking = {
        time: selectedTime,
        service: selectedService,
        note: note,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
      };

      const newBookingRef = db.ref("bookings").push();
      console.log("New Booking Data:", newBooking);
      newBookingRef
        .set(newBooking)
        .then(() => {
          setBookingStatus("Successfully booked!");
          setAppointments([
            ...appointments,
            { ...newBooking, key: newBookingRef.key },
          ]);

          // Add the booked time to the list of booked times
          setBookedTimes([...bookedTimes, selectedTime]);
          db.ref("bookedTimes").set(bookedTimes);
        })
        .catch((error) => {
          setBookingStatus("Failed to book. Please try again later.");
          console.error("Error saving booking data:", error);
        });
    }
  };

  const handleDeleteAppointment = (key, time) => {
    db.ref(`bookings/${key}`)
      .remove()
      .then(() => {
        setAppointments(
          appointments.filter((appointment) => appointment.key !== key)
        );

        // Remove the booked time from the list of booked times
        setBookedTimes(bookedTimes.filter((t) => t !== time));
        db.ref("bookedTimes").set(bookedTimes.filter((t) => t !== time));
        console.log("Appointment deleted:", key);
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  // Determine if a time is already booked
  const isTimeBooked = (time) => {
    return bookedTimes.includes(time);
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
        <select
          onChange={(e) => handleTimeSelection(e.target.value)}
          disabled={isTimeBooked(selectedTime)}
        >
          <option value="08:00" disabled={isTimeBooked("08:00")}>
            08:00
          </option>
          <option value="09:00" disabled={isTimeBooked("09:00")}>
            09:00
          </option>
          <option value="10:00" disabled={isTimeBooked("10:00")}>
            10:00
          </option>
        </select>

        <h2>Select Service</h2>
        <select onChange={handleServiceSelection}>
          <option value="">Select a service</option>
          <option value="Haircut">Haircut</option>
          <option value="Shave">Shave</option>
          <option value="Beard Trim">Beard Trim</option>
        </select>

        <h2>Add a Note</h2>
        <textarea value={note} onChange={handleNoteInput} />

        <button onClick={confirmBooking} disabled={isTimeBooked(selectedTime)}>
          Confirm
        </button>
        {bookingStatus && <p>{bookingStatus}</p>}
      </Modal>

      <h2>Booked Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.key}>
            Time: {appointment.time}, Service: {appointment.service}, Note:{" "}
            {appointment.note}
            <button
              onClick={() =>
                handleDeleteAppointment(appointment.key, appointment.time)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarComp;
