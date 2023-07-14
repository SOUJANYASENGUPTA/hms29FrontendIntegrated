import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BasicForm from './pages/login/basicForm';
import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
import { auth, firebase } from './pages/login/firebase';

import './App.css';
import Patient from './pages/Patients/Patient';
import MedicalRecords from './pages/MedicalRecords/MedicalRecords';
import Staff from './pages/Staff/Staff';
import Pharmacy from './pages/pharmacy/Pharmacy';
import Inventory from './pages/inventory/Inventory';
import Appointment from './pages/appointment/Appointment';
import Payment from './pages/billing/Billing';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [ver, setVer] = useState(false);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();

    let phone_number = e.target.phone.value;
    const appVerifier = window.recaptchaVerifier;

    auth
      .signInWithPhoneNumber(phone_number, appVerifier)
      .then((confirmationResult) => {
        console.log('otp sent');
        setViewOtpForm(true);
        window.confirmationResult = confirmationResult;
        alert('OTP sent✅');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const otpSubmit = (e) => {
    e.preventDefault();

    let opt_number = e.target.otp_value.value;

    window.confirmationResult
      .confirm(opt_number)
      .then((userCredential) => {
        console.log(userCredential);
        console.log('success');
        setAuthenticated(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        window.open("/", "_self");
        setAuthenticated(false);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: function (response) {
        console.log('Captcha Resolved');
      },
      defaultCountry: 'IN',
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div id="recaptcha-container"></div>
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <BasicForm loginSubmit={loginSubmit} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm} ver={ver} />
              )
            }
          />
            <React.Fragment>
              <Route
                path="/dashboard"
                element={
                 authenticated ? (
                  <div className="dashboard-container">
                    <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
                    <div className="dashboard-body">
                      <Dashboard />
                    </div>
                  </div>):(
                <BasicForm loginSubmit={loginSubmit} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm} ver={ver} />
              )
                }
              />
              <Route
                path="/patients"
                element={
                  authenticated?(
                  <div className="dashboard-container">
                    <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
                    <div className="dashboard-body">
                      <Patient />
                    </div>
                  </div>):(
                <BasicForm loginSubmit={loginSubmit} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm} ver={ver} />
              )
                }
              />
              <Route
                path="/records"
                element={
                  authenticated?(
                  <div className="dashboard-container">
                    <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
                    <div className="dashboard-body">
                      <MedicalRecords />
                    </div>
                  </div>):(
                <BasicForm loginSubmit={loginSubmit} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm} ver={ver} />
              )
                }
              />
              <Route
                path="/staff"
                element={
                  authenticated?(
                  <div className="dashboard-container">
                    <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
                    <div className="dashboard-body">
                      <Staff />
                    </div>
                  </div>):(
                <BasicForm loginSubmit={loginSubmit} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm} ver={ver} />
              )
                }
              />
              <Route
                path="/pharmacy"
                element={
                  authenticated?(
                  <div className="dashboard-container">
                    <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
                    <div className="dashboard-body">
                      <Pharmacy />
                    </div>
                  </div>):(
                <BasicForm loginSubmit={loginSubmit} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm} ver={ver} />
              )
                }
              />
              <Route
                path="/inventory"
                element={
                  authenticated?(
                  <div className="dashboard-container">
                    <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
                    <div className="dashboard-body">
                      <Inventory />
                    </div>
                  </div>):(
                <BasicForm loginSubmit={loginSubmit} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm} ver={ver} />
              )
                }
              />
              <Route
                path="/appointment"
                element={
                  authenticated?(
                  <div className="dashboard-container">
                    <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
                    <div className="dashboard-body">
                      <Appointment />
                    </div>
                  </div>):(
                <BasicForm loginSubmit={loginSubmit} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm} ver={ver} />
              )
                }
              />
              <Route
                path="/billing"
                element={
                  authenticated?(
                  <div className="dashboard-container">
                    <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
                    <div className="dashboard-body">
                      <Payment />
                    </div>
                  </div>):(
                <BasicForm loginSubmit={loginSubmit} otpSubmit={otpSubmit} viewOtpForm={viewOtpForm} ver={ver} />
              )
                }
              />
            </React.Fragment>
          
        </Routes>
    </Router>
  );
}

export default App;
