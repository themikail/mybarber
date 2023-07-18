import React, { useState } from "react";
import { auth } from "../../server/firebase";
import { useNavigate } from "react-router-dom";

function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect to the calendar page after successful login
        navigate("/");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect to the calendar page after successful signup
        navigate("/");
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
  };

  return (
    <div>
      <h1>Login or Signup</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default AuthComponent;
