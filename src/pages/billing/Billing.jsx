import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles.css';
import DashboardHeader from '../../components/DashboardHeader';
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
          {!edit && !add && <DashboardHeader btnText="New Payment" onClick={handleNewPayment} />}
          {(edit || add) && <DashboardHeader btnText="Back to Payments" onClick={handleBack} />}
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

                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Treatment Description</th>
                <th>Patient ID</th>
                <th>Actions</th>

              </thead>
              {payments.length !== 0 && (
                <tbody>
                  {payments.map((payment) => {
                    return (
                      <tr key={payment.id}>
                        <td><span>{payment.id}</span></td>
                        <td><span>{payment.date}</span></td>
                        <td><span>{payment.amount}</span></td>
                        <td><span>{payment.treatment_description}</span></td>
                        <td><span>{payment.patient_id}</span></td>
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
          <div className="form-elements">
            <div className="dashboard-content-header">
              <h2>Edit Payment Details</h2>
            </div>
            <form onSubmit={handleEditSubmit}>
              <label htmlFor="" className='form_label'>Payment ID:</label><br />
              <input type="text" value={id} className='form-inputs' onChange={(e) => setId(e.target.value)} readOnly />
              <br /><label htmlFor="" className='form_label'>Date:</label><br />
              <input type="date" value={date} className='form-inputs' onChange={(e) => setDate(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Amount:</label><br />
              <input type="text" value={amount} className='form-inputs' onChange={(e) => setAmount(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Treatment Description:</label><br />
              <input type="text" value={treatmentDescription} className='form-inputs' onChange={(e) => setTreatmentDescription(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Patient ID:</label><br />
              <input type="text" value={patientId} className='form-inputs' required />
              <br /><button type="submit" className="save-btn">Save</button>
              <button className="back-btn" onClick={handleBack}>Cancel</button>
            </form>
          </div>
        )}
        {add && (
          <div className="form-elements">
            <div className="dashboard-content-header">
              <h2>Add Payment</h2>
            </div>
            <form onSubmit={handleAddSubmit}>
              <label htmlFor="" className='form_label'>Date:</label><br />
              <input type="date" value={date} className='form-inputs' onChange={(e) => setDate(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Amount:</label><br />
              <input type="number" className='form-inputs' value={amount} onChange={(e) => setAmount(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Treatment Description:</label><br />
              <input type="text" className='form-inputs' value={treatmentDescription} onChange={(e) => setTreatmentDescription(e.target.value)} required />
              <br /><label htmlFor="" className='form_label'>Patient ID:</label><br />
              <input type="number" className='form-inputs' value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
              <br /><button type="submit" className="save-btn">Save</button>
              <button className="back-btn" onClick={handleBack}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
