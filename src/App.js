import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalendarComp from "./components/calendarComp";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import { AuthProvider } from "./components/auth/authContext";
import PrivateRoute from "./components/auth/privateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* PrivateRoute innerhalb von Routes */}
            <PrivateRoute path="/" element={<CalendarComp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
