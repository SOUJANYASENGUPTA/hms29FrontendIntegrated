import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../MedicalRecords/MedicalRecord.css';  
import '../styles.css';
const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [treatmentDescription, setTreatmentDescription] = useState('');
  const [patientId, setPatientId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPayments = async () => {
    await axios.get('http://localhost:8080/billing').then((response) => {
      setPayments(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const submitDelete = async (id) => {
    await axios.delete(`http://localhost:8080/billing/${id}`).then(() => {
      console.log('Payment deleted');
      fetchPayments();
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        submitDelete(id);
        Swal.fire({
          icon: 'success',
          title: 'Payment Deleted',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const handleEdit = (payment) => {
    setEdit(true);
    setId(payment.id);
    setDate(payment.date);
    setAmount(payment.amount);
    setTreatmentDescription(payment.treatment_description);
    setPatientId(payment.patient_id);
  };

  const handleNewPayment = (e) => {
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
    const updatedPayment = {
      id: id,
      date: date,
      amount: amount,
      treatment_description: treatmentDescription,
      patient_id: patientId,
    };
    await axios.put('http://localhost:8080/billing', updatedPayment).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Payment Updated Successfully',
        showConfirmButton: false,
        timer: 1000,
      });
      setEdit(false);
      clearFields();
      fetchPayments();
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const payment = {
      date: date,
      amount: amount,
      treatment_description: treatmentDescription,
      patient_id: patientId,
    };
    await axios.post('http://localhost:8080/billing', payment).then((response) => {
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Payment Added',
        showConfirmButton: false,
        timer: 1000,
      });
      fetchPayments();
      setAdd(false);
      clearFields();
    }).catch((err) => {
      console.log(err);
    });
  };

  const clearFields = () => {
    setId('');
    setDate('');
    setAmount('');
    setTreatmentDescription('');
    setPatientId('');
  };

  return (
    <div>
      <div className="dashboard-content">
        <div className="dashbord-header-container">
          {!edit && !add && (
            <button className="dashbord-header-btn" onClick={handleNewPayment}>
              New Payment
            </button>
          )}
          {(edit || add) && (
            <button className="dashbord-header-btn" onClick={handleBack}>
              Back to Payments
            </button>
          )}
        </div>
        {!edit && !add && (
          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <h2>Payment List</h2>
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
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Treatment Description</th>
                  <th>Patient ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {payments.length !== 0 && (
                <tbody>
                  {payments.map((payment) => {
                    return (
                      <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.date}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.treatment_description}</td>
                        <td>{payment.patient_id}</td>
                        <td>
                          <button onClick={() => handleEdit(payment)} className="edit-save-btn">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(payment.id)} className="edit-back-btn">
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
              <h2>Edit Payment Details</h2>
            </div>
            <form onSubmit={handleEditSubmit}>
              <label>Payment ID:</label>
              <input type="text" value={id} onChange={(e) => setId(e.target.value)} readOnly />
              <label>Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <label>Amount:</label>
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              <label>Treatment Description:</label>
              <input type="text" value={treatmentDescription} onChange={(e) => setTreatmentDescription(e.target.value)} required />
              <label>Patient ID:</label>
              <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
              <button type="submit" className="save-btn">Save</button>
              <button className="back-btn" onClick={handleBack}>Cancel</button>
            </form>
          </div>
        )}
        {add && (
          <div className="medical-record-form">
            <div className="dashboard-content-header">
              <h2>Add Payment</h2>
            </div>
            <form onSubmit={handleAddSubmit}>
              <label>Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <label>Amount:</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              <label>Treatment Description:</label>
              <input type="text" value={treatmentDescription} onChange={(e) => setTreatmentDescription(e.target.value)} required />
              <label>Patient ID:</label>
              <input type="number" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
              <button type="submit" className="save-btn">Save</button>
              <button className="back-btn" onClick={handleBack}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
