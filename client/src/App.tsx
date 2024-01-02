import Activate from "@/pages/Activate";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import ResetPasswordConfirm from "@/pages/ResetPasswordConfirm";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Rooms from "./pages/Rooms";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:token" element={<Activate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password-confirm/:token"
          element={<ResetPasswordConfirm />}
        />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          {/* <Route path="bookings/:bookingId" element={<Booking />} />
          <Route path="checkin/:bookingId" element={<Checkin />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} /> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
