import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Error from "./components/Error";
import Login from "./components/Login";
import Profile from "./components/Profile";
import "./index.css";
import loginSlice from "./reducers/auth";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Home from "./components/Home";
import "./App.css";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});

function BasicLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate push to="/profile" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AdminLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate push to="/login" />;
  }

  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/" element={<AdminLayout />}>
            <Route index path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
