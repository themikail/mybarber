import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firestore, auth } from "../../server/firebase";

function SignUp({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Verwenden Sie useNavigate anstelle von useHistory

  const handleRegister = () => {
    // Perform user registration
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User registered successfully
        const user = userCredential.user;

        // Save user data to Firestore
        firestore.collection("users").doc(user.uid).set({
          email,
          name,
          phoneNumber,
        });

        // Update the state with the logged-in user
        setUser({ email, name, phoneNumber });

        // Redirect to CalendarComp
        navigate("/"); // Hier erfolgt die Weiterleitung
      })
      .catch((error) => {
        // Handle registration errors
        console.error("Error registering user:", error);
        setErrorMessage(
          "Fehler bei der Registrierung. Bitte versuchen Sie es erneut."
        );
      });
  };

  return (
    <div>
      <h2>Registrieren</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="text"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Handynummer"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleRegister}>Registrieren</button>

      {/* Button zum Login */}
      <p>
        Bereits registriert? Zum <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;
