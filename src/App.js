import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Patient from './pages/Patients/Patient';
import MedicalRecords from './pages/MedicalRecords/MedicalRecords'
import Staff from './pages/Staff/Staff';
import Pharmacy from './pages/pharmacy/Pharmacy';
import Inventory from './pages/inventory/Inventory';
function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={<div></div>} />
                  <Route exact path="/patients" element={<Patient/>} />
                  <Route exact path="/records" element={<MedicalRecords/>} />
                  <Route exact path="/staff" element={<Staff/>} />
                  <Route exact path="/pharmacy" element={<Pharmacy/>} />
                  <Route exact path="/inventory" element={<Inventory/>} />
                  <Route exact path="/profile" element={<div></div>} />
              </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;