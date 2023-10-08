import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import CalendarComponent from "./components/calendarComp";
import Login from "./components/login/Login";
import SignUp from "./components/singup/SignUp";

function App() {
  const [user, setUser] = useState(null);

  const PrivateRoute = ({ element: Element }) => {
    if (!user) {
      // Wenn der Benutzer nicht angemeldet ist, navigiere zur Login-Seite
      return <Navigate to="/login" />;
    }

    return <Element user={user} />; // user als Prop an das gerenderte Element übergeben
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />{" "}
          {/* Übergeben Sie setUser an SignUp */}
          <Route
            path="/"
            element={<PrivateRoute element={CalendarComponent} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
