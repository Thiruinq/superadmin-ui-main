import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ParkingSpot from "./pages/ParkingSpot";
import AddParkingSpot from "./pages/AddParkingSpot";
import ViewParkingSpot from "./components/ViewParkingSpot";
import EditParkingSpot from "./components/EditParkingSpot";
import CurrentUpcoming from "./pages/CurrentUpcoming";
import EditCurrentBooking from "./components/EditCurrentBooking";
import ViewCurrentBooking from "./components/ViewCurrentBooking";
import CancelledBooking from "./pages/CancelledBooking";
import ViewCancelledBooking from "./components/ViewCancelledBooking";
import BookingDetails from "./components/BookingDetails";
import MoneyReceived from "./components/MoneyReceived";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import PastBooking from "./components/PastBooking";
import ViewPastBooking from "./components/ViewPastBooking";
import RefundCancelledBooking from "./components/RefundCancelledBooking";

const AppRoutes = () => {
  const UnAuthenticated = ({ children }) => {
    const auth = localStorage.getItem("isAdminLogin");
    if (!auth) {
      return <>{children}</>;
    } else {
      window.location.href = "/";
    }
  };
  const Authenticated = ({ children }) => {
    const auth = localStorage.getItem("isAdminLogin");
    if (auth) {
      return <>{children}</>;
    } else {
      window.location.href = "/login";
    }
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Authenticated>
            <Dashboard />
          </Authenticated>
        }
      />
      <Route
        path="/parking-spot"
        element={
          <Authenticated>
            <ParkingSpot />
          </Authenticated>
        }
      />
      <Route
        path="/add-parking-spot"
        element={
          <Authenticated>
            <AddParkingSpot />
          </Authenticated>
        }
      />
      <Route
        path="/view-parking-spot"
        element={
          <Authenticated>
            <ViewParkingSpot />
          </Authenticated>
        }
      />
      <Route
        path="/edit-parking-spot"
        element={
          <Authenticated>
            <EditParkingSpot />
          </Authenticated>
        }
      />
      <Route
        path="/current-upcoming"
        element={
          <Authenticated>
            <CurrentUpcoming />
          </Authenticated>
        }
      />
      <Route
        path="/edit-current-booking"
        element={
          <Authenticated>
            <EditCurrentBooking />
          </Authenticated>
        }
      />
      <Route
        path="/view-current-booking"
        element={
          <Authenticated>
            <ViewCurrentBooking />
          </Authenticated>
        }
      />
      <Route
        path="/past-booking"
        element={
          <Authenticated>
            <PastBooking />
          </Authenticated>
        }
      />

      <Route
        path="/cancelled-booking"
        element={
          <Authenticated>
            <CancelledBooking />
          </Authenticated>
        }
      />

      <Route
        path="/view-cancelled-booking"
        element={
          <Authenticated>
            <ViewCancelledBooking />
          </Authenticated>
        }
      />
      <Route
        path="/refund-cancelled-booking"
        element={
          <Authenticated>
            <RefundCancelledBooking />
          </Authenticated>
        }
      />

      <Route
        path="/view-past-booking"
        element={
          <Authenticated>
            <ViewPastBooking />
          </Authenticated>
        }
      />

      <Route
        path="/booking-details"
        element={
          <Authenticated>
            <BookingDetails />
          </Authenticated>
        }
      />
      <Route
        path="/money-received"
        element={
          <Authenticated>
            <MoneyReceived />
          </Authenticated>
        }
      />
      <Route
        path="/profile"
        element={
          <Authenticated>
            <Profile />
          </Authenticated>
        }
      />

      <Route
        path="/login"
        element={
          <UnAuthenticated>
            <Login />
          </UnAuthenticated>
        }
      />
      <Route
        path="/register"
        element={
          <UnAuthenticated>
            <Register />
          </UnAuthenticated>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
