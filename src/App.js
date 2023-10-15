import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import CalendarComp from "./components/calendarComp";
import Login from "./components/login/Login";
import SignUp from "./components/singup/SignUp";

function App() {
  const [user, setUser] = useState(null);

  const PrivateRoute = ({ element: Element }) => {
    if (!user) {
      // If the user is not logged in, navigate to the Login page
      return <Navigate to="/login" />;
    }

    return <Element user={user} />; // Pass 'user' as a prop to the rendered element
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />{" "}
          {/* Pass 'setUser' to SignUp */}
          <Route path="/" element={<PrivateRoute element={CalendarComp} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
