import React, { useState } from "react";
import { auth } from "../../server/firebase";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      <h1>Signup</h1>
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
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default SignUp;
