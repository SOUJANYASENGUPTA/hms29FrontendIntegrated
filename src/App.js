import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
import './App.css';
import Patient from './pages/patients/Patient';
import MedicalRecords from './pages/medicalrecords/MedicalRecords';
import Staff from './pages/staff/Staff';
import Pharmacy from './pages/pharmacy/Pharmacy';
import Inventory from './pages/inventory/Inventory';
import Appointment from './pages/appointment/Appointment';
import Payment from './pages/billing/Billing';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import useAuth from './pages/login/Auth';
import axios from 'axios';
import Swal from 'sweetalert2';
function App() {
  const { authenticated, login, logout } = useAuth();
  const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to sign out?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
  }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title:"Signing out...",
        //   showConfirmButton:false,
        //   timer:1200
        // })
        //   setTimeout(()=>{
        //     logout();
        //   },1300)
        logout();
      }
  })
  };
  const generateToken = () => {
    var token = "";
    for (var i = 0; i < 26; i++) {
      var randomValue = Math.random();
      if (randomValue < 0.5) {
        token += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      } else {
        token += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
      }
    }
    return token;
  };
  const loginSubmit = async (e, phone, password) => {
    e.preventDefault();
    await axios.get('http://localhost:8080/staff').then((response) => {
      if (response.data) {
        var staff = response.data;
        var admin = staff?.find((st) => {
          return st.phone === phone && "admin" === (st.jobTitle.toLowerCase());
        })
        if (admin !== undefined && password === "admin") {
          const token = generateToken();
          localStorage.setItem('authToken', token);
          // Swal.fire({
          //   title:"Signing in...",
          //   showConfirmButton:false,
          //   timer:1200
          // })
          //   setTimeout(()=>{
          //     login(token)
          //   },1300)
          login(token)
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Invalid Details"
          })
        }
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  const DashboardContainer = () => {
    return (
      <div className="dashboard-container">
        <SideBar menu={sidebar_menu} signOut={handleLogout}/>
        <div className="dashboard-body">
          <Outlet />
        </div>
      </div>
    );
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={authenticated ? <Navigate to="/" replace /> : <Login authenticated={authenticated} loginSubmit={loginSubmit} logout={handleLogout} />} />
        <Route path="*" element={authenticated ? (<DashboardContainer />) : (<Navigate to="/login" replace />)}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patient />} />
          <Route path="records" element={<MedicalRecords />} />
          <Route path="staff" element={<Staff />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="billing" element={<Payment />} />
          <Route path="*" element={<>Page not found</>}></Route>
        </Route>
        <Route path="*" element={authenticated ? <DashboardContainer /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
