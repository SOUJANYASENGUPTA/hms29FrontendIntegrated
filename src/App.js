import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import BasicForm from './pages/login/basicForm';
import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
import { useEffect,useState } from 'react';
import { auth , firebase } from './pages/login/firebase';

import './App.css';
import Patient from './pages/Patients/Patient';
import MedicalRecords from './pages/MedicalRecords/MedicalRecords'
import Staff from './pages/Staff/Staff';
import Pharmacy from './pages/pharmacy/Pharmacy';
import Inventory from './pages/inventory/Inventory';
import Appointment from './pages/appoitment/Appointment';
import Payment from './pages/billing/Billing';
function App () {
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [ver,setVer] = useState(false);
  
  const loginSubmit = (e) => {
    e.preventDefault();

    let phone_number = e.target.phone.value;
    const appVerifier = window.recaptchaVerifier;

    auth
        .signInWithPhoneNumber(phone_number, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            console.log("otp sent");
            setViewOtpForm(true);
            window.confirmationResult = confirmationResult;
            alert("OTP sent✅")
            // ...
        })
        .catch((error) => {
            // Error; SMS not sent
            // ...
            alert(error.message);
        });
};
const otpSubmit = (e) => {
  e.preventDefault();

  let opt_number = e.target.otp_value.value;

  window.confirmationResult
      .confirm(opt_number)
      .then((confirmationResult) => {
          console.log(confirmationResult);
          console.log("success");
          window.open("/patients","_self"); 
      })
      .catch((error) => {
          // User couldn't sign in (bad verification code?)
          alert(error.message);
          
      });
};

const signOut = () => {
    auth
    .signOut()
    .then(() => {
        window.open("/", "_self");
    })
    .catch((error) => {
        // An error happened.
        console.log(error);
    });
};

const [user, setUser] = useState([]);
auth.onAuthStateChanged((user) => {
  if (user) {
      setUser(user);
      
  }
});
  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container", {
            size: "invisible",
            callback: function(response) {
                console.log("Captcha Resolved");
            },
            defaultCountry: "IN",
        }
    );
}, []);

  return(
    <Router>
    <div id="recaptcha-container"></div>
      <Routes>
        <Route   
          path="/"
          element={
            <BasicForm
              loginSubmit={loginSubmit}
              otpSubmit={otpSubmit}
              viewOtpForm={viewOtpForm}
              ver={ver}
            />
          }
        />
        <Route
          exact path="/patients"
          element={
            <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
            <div className='dashboard-body'>
              <Patient/>   
            </div>
            </div>       
          }
        />
        <Route
          exact path="/records"
          element={
            <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
            <div className='dashboard-body'>
              <MedicalRecords/>
            </div>
            </div> 
          
          }
        />
        <Route
          exact path="/staff"
          element={
            <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
            <div className='dashboard-body'>
              <Staff/>
            </div>
            </div>
          }
        />
        <Route
          exact path="/pharmacy"
          element={
            <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
            <div className='dashboard-body'>
              <Pharmacy/>
            </div>
            </div>
          }
        />
        <Route
          exact path="/inventory"
          element={
        
            <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
            <div className='dashboard-body'>
              <Inventory/>
            </div>
            </div>
            
          }
        />
        {/* <Route
          exact path="appointment"
          element={
            <>
              <SideBar menu={sidebar_menu} signOut={signOut} user={user}/>
              <Appointment/>
            </>
          }
        />
        <Route
          exact path="/billing"
          element={
            <>
              <SideBar menu={sidebar_menu} signOut={signOut} user={user}/>
              <Billing/>
            </>
          }
        /> */}
        <Route
          exact path="/appointment"
          element={
            <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
            <div className='dashboard-body'>
              <Appointment/>
            </div>
            </div>
          }
        />
        <Route
          exact path="/billing"
          element={
            <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} signOut={signOut} user={user} />
            <div className='dashboard-body'>
              <Payment/>
            </div>
            </div>
          }
        />
      </Routes>
  </Router>
  )
}

export default App;