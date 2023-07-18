import "./App.css";
import CalendarComponent from "./components/calendarComp";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
function App() {
  return (
    <div className="App">
      <CalendarComponent />
      <Login />
    </div>
  );
}

export default App;
