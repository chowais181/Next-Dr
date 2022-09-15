import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//--------------------pages-------------------
import Home from "./Pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LandingPage from "./Pages/LandingPage";
// -------------------------------------------
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
