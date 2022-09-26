import "./assets/App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//--------------------pages-------------------
import Home from "./Pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LandingPage from "./Pages/LandingPage";
// -------------------------------------------

import { Toaster } from "react-hot-toast";

//-----------------------
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PublicRoute from "./components/routing/PublicRoute";
import Profile from "./components/profile/Profile";
import AppointmentForm from "./components/bookAppointment/AppointmentForm";
import CreateProfile from "./components/profile-forms/CreateProfile";
import AddEducation from "./components/profile-forms/AddEducation";
import AddExperience from "./components/profile-forms/AddExperience";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/doctor/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/appointment/:id"
            element={
              <ProtectedRoute>
                <AppointmentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-education"
            element={
              <ProtectedRoute>
                <AddEducation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-experience"
            element={
              <ProtectedRoute>
                <AddExperience />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
