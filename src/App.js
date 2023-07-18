import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalendarComp from "./components/calendarComp";
import PrivateRoute from "./components/auth/privateRoute";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={CalendarComp} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="signup" element={<SignUp />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
