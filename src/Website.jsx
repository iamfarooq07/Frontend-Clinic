import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import Diagnosis from "./pages/Diagnosis";
import MyAppointments from "./pages/MyAppointments";
import MyPrescriptions from "./pages/MyPrescriptions";
import MyHistory from "./pages/MyHistory";
import Home from "./Home";

function Website() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/*"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receptionist/*"
            element={
              <ProtectedRoute allowedRoles={["receptionist"]}>
                <ReceptionistDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/*"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients/:id"
            element={
              <ProtectedRoute>
                <PatientDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/prescriptions"
            element={
              <ProtectedRoute>
                <Prescriptions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/diagnosis"
            element={
              <ProtectedRoute allowedRoles={["doctor", "admin"]}>
                <Diagnosis />
              </ProtectedRoute>
            }
          />

          {/* Patient Routes */}
          <Route
            path="/my-appointments"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <MyAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-prescriptions"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <MyPrescriptions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-history"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <MyHistory />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Website;
