import React, { useState, useEffect } from "react";
import { db, auth } from "../server/firebase";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function CalendarComp() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [note, setNote] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [user, setUser] = useState(null);

  // Abonnieren Sie den aktuellen Benutzer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Wenn ein Benutzer angemeldet ist, setzen Sie den Benutzerzustand
        setUser(authUser);
      } else {
        // Wenn kein Benutzer angemeldet ist, setzen Sie den Benutzerzustand auf null
        setUser(null);
      }
    });

    // Unsubscribe von Auth-Änderungen, wenn die Komponente unmontiert wird
    return () => {
      unsubscribe();
    };
  }, []);

  // Laden Sie gebuchte Zeiten von Firestore, wenn die Komponente montiert wird
  useEffect(() => {
    if (user) {
      // Hier gehen wir davon aus, dass jede Benutzer-E-Mail-Adresse eindeutig ist
      const bookedTimesRef = db
        .collection("bookedTimes")
        .where("userEmail", "==", user.email);

      bookedTimesRef.onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setBookedTimes(data);
      });
    }
  }, [user]);

  // Der Rest des Codes bleibt weitgehend unverändert
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
        userEmail: user.email, // Fügen Sie die Benutzer-E-Mail hinzu
      };

      const newBookingRef = db.collection("bookings").doc();
      console.log("New Booking Data:", newBooking);
      newBookingRef
        .set(newBooking)
        .then(() => {
          setBookingStatus("Successfully booked!");
          setAppointments([
            ...appointments,
            { ...newBooking, key: newBookingRef.id },
          ]);

          // Add the booked time to the list of booked times
          setBookedTimes([...bookedTimes, selectedTime]);
          db.collection("bookedTimes").add({
            userEmail: user.email,
            time: selectedTime,
          });
        })
        .catch((error) => {
          setBookingStatus("Failed to book. Please try again later.");
          console.error("Error saving booking data:", error);
        });
    }
  };

  const handleDeleteAppointment = (key, time) => {
    db.collection("bookings")
      .doc(key)
      .delete()
      .then(() => {
        setAppointments(
          appointments.filter((appointment) => appointment.key !== key)
        );

        // Remove the booked time from the list of booked times
        setBookedTimes(bookedTimes.filter((t) => t !== time));
        db.collection("bookedTimes")
          .where("userEmail", "==", user.email)
          .where("time", "==", time)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });
        console.log("Appointment deleted:", key);
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  const isTimeBooked = (time) => {
    return bookedTimes.some((bt) => bt.time === time);
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
