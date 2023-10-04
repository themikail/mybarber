import React, { useState } from "react";
import { db } from "../server/firebase"; // Stelle sicher, dass der richtige Pfad zu Firebase verwendet wird
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

Modal.setAppElement("#root"); // Ersetze "#root" durch die ID deines Wurzelelements

function CalendarComp() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [note, setNote] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [show, setShow] = useState(true);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    setSelectedTime(null);
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
    if (selectedTime && selectedService) {
      const newBooking = {
        time: selectedTime,
        service: selectedService,
        note: note,
      };

      const newBookingRef = db.ref("bookings").push();
      newBookingRef
        .set(newBooking)
        .then(() => {
          setBookingStatus("Erfolgreich gebucht!");
          setAppointments([
            ...appointments,
            { ...newBooking, key: newBookingRef.key },
          ]);
          console.log("Buchungsdaten gespeichert:", newBooking);
        })
        .catch((error) => {
          setBookingStatus(
            "Fehler beim Buchen. Bitte versuchen Sie es später erneut."
          );
          console.error("Fehler beim Speichern der Buchungsdaten:", error);
        });
    }
  };

  const handleDeleteAppointment = (key) => {
    db.ref(`bookings/${key}`)
      .remove()
      .then(() => {
        setAppointments(
          appointments.filter((appointment) => appointment.key !== key)
        );
        console.log("Termin gelöscht:", key);
      })
      .catch((error) => {
        console.error("Fehler beim Löschen des Termins:", error);
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
        <h2>Zeit auswählen</h2>
        <select onChange={(e) => handleTimeSelection(e.target.value)}>
          <option value="08:00">08:00</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          {/* Füge weitere Zeitoptionen hinzu, wie benötigt */}
        </select>

        <h2>Service auswählen</h2>
        <select onChange={handleServiceSelection}>
          <option value="">Wählen Sie einen Service aus</option>
          <option value="Haarschnitt">Haarschnitt</option>
          <option value="Rasur">Rasur</option>
          <option value="Barttrimmung">Barttrimmung</option>
          {/* Füge weitere Serviceoptionen hinzu, wie benötigt */}
        </select>

        <h2>Notiz hinzufügen</h2>
        <textarea value={note} onChange={handleNoteInput} />

        <button onClick={confirmBooking}>Bestätigen</button>
        {bookingStatus && <p>{bookingStatus}</p>}
      </Modal>
      <h2>Gebuchte Termine</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.key}>
            Zeit: {appointment.time}, Service: {appointment.service}, Notiz:{" "}
            {appointment.note}
            <Alert show={show} variant="success">
              <Alert.Heading>My Alert</Alert.Heading>
              <p>sicher</p>
              <hr />
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => handleDeleteAppointment(appointment.key)}
                >
                  Löschen
                </button>
                <Button
                  onClick={() => setShow(false)}
                  variant="outline-success"
                >
                  nein
                </Button>
              </div>
            </Alert>
            {!show && <Button onClick={() => setShow(true)}>Löschen</Button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarComp;
