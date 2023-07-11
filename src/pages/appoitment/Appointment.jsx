import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../MedicalRecords/MedicalRecord.css';
import '../styles.css';
const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [id, setId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAppointments = async () => {
    await axios.get('http://localhost:8080/appointment').then((response) => {
      setAppointments(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const submitDelete = async (id) => {
    await axios.delete(`http://localhost:8080/appointment/${id}`).then(() => {
      console.log('Appointment deleted');
      fetchAppointments();
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Do you want to Delete?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        submitDelete(id);
        Swal.fire({
          icon: 'success',
          title: 'Appointment Deleted',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const handleEdit = (appointment) => {
    setEdit(true);
    setId(appointment.id);
    setPatientId(appointment.patientId);
    setDoctorId(appointment.doctorId);
    setDate(appointment.date);
    setTime(appointment.time);
    setDuration(appointment.duration);
    setStatus(appointment.status);
  };

  const handleNewAppointment = (e) => {
    e.preventDefault();
    setAdd(true);
    setEdit(false);
    clearFields();
  };

  const handleBack = (e) => {
    e.preventDefault();
    setAdd(false);
    setEdit(false);
    clearFields();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedAppointment = {
      id: id,
      patientId: patientId,
      doctorId: doctorId,
      date: date,
      time: time,
      duration: duration,
      status: status,
    };
    await axios.put('http://localhost:8080/appointment', updatedAppointment).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Appointment Updated Successfully',
        showConfirmButton: false,
        timer: 1000,
      });
      setEdit(false);
      clearFields();
      fetchAppointments();
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const appointment = {
      patientId: patientId,
      doctorId: doctorId,
      date: date,
      time: time,
      duration: duration,
      status: status,
    };
    await axios.post('http://localhost:8080/appointment', appointment).then((response) => {
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Appointment Added',
        showConfirmButton: false,
        timer: 1000,
      });
      fetchAppointments();
      setAdd(false);
      clearFields();
    }).catch((err) => {
      console.log(err);
    });
  };

  const clearFields = () => {
    setId('');
    setPatientId('');
    setDoctorId('');
    setDate('');
    setTime('');
    setDuration('');
    setStatus('');
  };

  return (
    <div>
      <div className="dashboard-content">
        <div className="dashbord-header-container">
          {!edit && !add && (
            <button className="dashbord-header-btn" onClick={handleNewAppointment}>
              New Appointment
            </button>
          )}
          {(edit || add) && (
            <button className="dashbord-header-btn" onClick={handleBack}>
              Back to Appointments
            </button>
          )}
        </div>
        {!edit && !add && (
          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <h2>Appointment List</h2>
              <div className='dashboard-content-search'>
                            <input
                                type='text'
                                placeholder='Search..'
                                className='dashboard-content-input'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                min="1"
                                inputMode="numeric"
                            />
                </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient ID</th>
                  <th>Doctor ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {appointments.length !== 0 && (
                <tbody>
                  {appointments
                    .filter((appointment) => {
                      return (
                        appointment.id.toString().includes(searchQuery) ||
                        appointment.patientId.toString().includes(searchQuery)
                      );
                    })
                    .map((appointment) => {
                      return (
                        <tr key={appointment.id}>
                          <td>{appointment.id}</td>
                          <td>{appointment.patientId}</td>
                          <td>{appointment.doctorId}</td>
                          <td>{appointment.date}</td>
                          <td>{appointment.time}</td>
                          <td>{appointment.duration}</td>
                          <td>{appointment.status}</td>
                          <td>
                            <button onClick={() => handleEdit(appointment)} className="edit-save-btn">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(appointment.id)} className="edit-back-btn">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              )}
            </table>
          </div>
        )}
        {edit && (
          <div className="medical-record-form">
            <div className="dashboard-content-header">
              <h2>Edit Appointment Details</h2>
            </div>
            <form onSubmit={handleEditSubmit}>
              <label>Appointment ID:</label>
              <input type="number" value={id} onChange={(e) => setId(e.target.value)} readOnly />
              <label>Patient ID:</label>
              <input type="number" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
              <label>Doctor ID:</label>
              <input type="number" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
              <label>Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <label>Time:</label>
              <input type="text" value={time} onChange={(e) => setTime(e.target.value)} required />
              <label>Duration:</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
              <label>Status:</label>
              <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
              <button type="submit" className="save-btn">Save</button>
              <button className="back-btn" onClick={handleBack}>Cancel</button>
            </form>
          </div>
        )}
        {add && (
          <div className="medical-record-form">
            <div className="dashboard-content-header">
              <h2>Add Appointment</h2>
            </div>
            <form onSubmit={handleAddSubmit}>
              <label>Patient ID:</label>
              <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
              <label>Doctor ID:</label>
              <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
              <label>Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <label>Time:</label>
              <input type="text" value={time} onChange={(e) => setTime(e.target.value)} required />
              <label>Duration:</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
              <label>Status:</label>
              <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
              <button type="submit" className="save-btn">Save</button>
              <button className="back-btn" onClick={handleBack}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
