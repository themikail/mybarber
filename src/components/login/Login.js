import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importieren Sie Link und useNavigate aus react-router-dom
import { auth } from "../../server/firebase"; // Importieren Sie auth aus Ihrer Firebase-Konfiguration

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Verwenden Sie useNavigate für die Weiterleitung

  const handleLogin = () => {
    // Authentifizieren Sie den Benutzer mit Firebase
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Anmeldung erfolgreich
        const user = userCredential.user;

        // Setzen Sie den Benutzer mit setUser
        setUser({ email: user.email }); // Beispiel: Hier wird nur die E-Mail des Benutzers gespeichert

        // Weiterleitung zur CalendarComp
        navigate("/");
      })
      .catch((error) => {
        // Fehler bei der Anmeldung behandeln
        console.error("Fehler bei der Anmeldung:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Anmelden</button>

      {/* Button zur Registrierung */}
      <p>
        Noch kein Benutzer? Zum <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
