import React, { useEffect, useState } from 'react'
import '../styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import axios from 'axios';
import '../MedicalRecords/MedicalRecord.css'
import Swal from 'sweetalert2';
const Pharmacy = () => {
    const [pharmacy, setPharmacy] = useState([]);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [dosage, setDosage] = useState('')
    const [refillDate, setRefillDate] = useState('')
    const [prescriptionNumber, setPrescriptionNumber] = useState('')
    const [patientId, setPatientId] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const fetchpharmacies = async () => {
        await axios.get('http://localhost:8080/pharmacy').then((response) => {
            setPharmacy(response.data);
            console.log(response.data)
        })
    }
    useEffect(() => {
        fetchpharmacies();
    }, [])
    const SubmitDelete = async (id) => {
        await axios.delete(`http://localhost:8080/pharmacy/${id}`).then(() => {
            console.log("in delete")
            fetchpharmacies();
        })
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                SubmitDelete(id);
                Swal.fire({
                    icon: 'success',
                    title: 'pharmacy Deleted',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }
    const handleEdit = (pharmacy) => {
        setEdit(true);
        setId(pharmacy.id)
        setName(pharmacy.medication_name)
        setDosage(pharmacy.dosage)
        setRefillDate(pharmacy.refill_date)
        setPrescriptionNumber(pharmacy.prescription_number)
        setPatientId(pharmacy.patient_id)
    }
    const handleNewRecord = (e) => {
        e.preventDefault();
        setAdd(true);
        setEdit(false);
        clearFields();
    }
    const handleBack = (e) => {
        e.preventDefault();
        setAdd(false);
        setEdit(false);
        clearFields();
    }
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedpharmacy = {
            id: id,
            medication_name: name,
            dosage: dosage,
            refill_date: refillDate,
            prescription_number: prescriptionNumber,
            patient_id: patientId
        }
        console.log(updatedpharmacy)
        await axios.put(`http://localhost:8080/pharmacy`, updatedpharmacy).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'pharmacy Updated Successfully',
                showConfirmButton: false,
                timer: 1000
            })
            setEdit(false);
            clearFields();
            fetchpharmacies();
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const pharmacy = {
            medication_name: name,
            dosage: dosage,
            refill_date: refillDate,
            prescription_number: prescriptionNumber,
            patient_id: patientId
        }
        console.log(pharmacy)
        await axios.post('http://localhost:8080/pharmacy', pharmacy).then((response) => {
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'pharmacy Added',
                showConfirmButton: false,
                timer: 1000
            })
            fetchpharmacies();
            setAdd(false);
            clearFields();
        }).catch((err) => {
            console.log(err);
        })
    }
    const clearFields = () => {
        setName('')
        setDosage('')
        setPatientId('')
        setId('')
        setPrescriptionNumber('')
        setRefillDate('')
    }
    return (
        <div>
            <div className='dashboard-content'>
                <div className='dashbord-header-container'>
                    {!edit && !add && <button className='dashbord-header-btn' onClick={handleNewRecord}>New pharmacy</button>}
                    {(edit || add) && <button className='dashbord-header-btn' onClick={handleBack}>Back to pharmacy</button>}
                    {/*<div className='dashbord-header-right'>
                        <img
                            src={NotificationIcon}
                            alt='notificationIcon'
                            className='dashbord-header-icon' />
                        <img
                            src={SettingsIcon}
                            alt='settingsIcon'
                            className='dashbord-header-icon' />
                        <img
                            className='dashbord-header-avatar'
                            src='https://reqres.in/img/faces/9-image.jpg' alt="dashImage" />
                    </div>*/}
                </div>
                {!edit && !add && <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Pharmacy List</h2>
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
                            <th>MEDICATION NAME</th>
                            <th>DOSAGE</th>
                            <th>REFILL DATE</th>
                            <th>PRESCRIPTION</th>
                            <th>PATIENT ID</th>
                            <th>ACTIONS</th>
                        </thead>
                        {pharmacy.length !== 0 &&
                            <tbody>
                                {pharmacy
                                    .filter(pharmacy => {
                                        return (
                                            pharmacy.id.toString().includes(searchQuery) ||
                                            pharmacy.medication_name.toLowerCase().includes(searchQuery)
                                        );
                                    })
                                    .map((pharmacy) => {
                                        return <tr key={pharmacy.id}>
                                            <td><span>{pharmacy.id}</span></td>
                                            <td><span>{pharmacy.medication_name}</span></td>
                                            <td><span>{pharmacy.dosage}</span></td>
                                            <td><span>{pharmacy.refill_date}</span></td>
                                            <td><span>{pharmacy.prescription_number}</span></td>
                                            <td><span>{pharmacy.patient_id}</span></td>
                                            <td>
                                                <button onClick={() => handleEdit(pharmacy)} className='edit-save-btn'>Edit</button>
                                                <button onClick={() => handleDelete(pharmacy.id)} className='edit-back-btn'>Delete</button>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        }
                    </table>
                </div>}
                {edit &&
                    <div className='medical-record-form'>
                        <div className='dashboard-content-header'>
                            <h2>Edit pharmacy Details</h2>
                        </div>
                        <div>
                            <form onSubmit={handleEditSubmit}>
                                <label htmlFor="">Pharmacy Id</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={id} onChange={(e) => setId(e.target.value)} readOnly />
                                <br />
                                <label htmlFor="" className='form_label'>Medication Name</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={name} onChange={(e) => setName(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Dosage</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={dosage} onChange={(e) => setDosage(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Refill Date</label>
                                <br />
                                <input type="date" name="" id="" className='medical-record-input' value={refillDate} onChange={(e) => setRefillDate(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Prescription Number</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={prescriptionNumber} onChange={(e) => setPrescriptionNumber(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Patient Id</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
                                <br />
                                <button type="submit" className='save-btn'>Save</button>
                                <button className='back-btn' onClick={handleBack}>Cancel</button>
                            </form>
                        </div>

                    </div>
                }
                {add &&
                    <div className='medical-record-form'>
                        <div className='dashboard-content-header'>
                            <h2>Add pharmacy</h2>
                        </div>
                        <div>
                            <form onSubmit={handleAddSubmit}>
                                <label htmlFor="" className='form_label'>Medication Name</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={name} onChange={(e) => setName(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Dosage</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={dosage} onChange={(e) => setDosage(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Refill Date</label>
                                <br />
                                <input type="date" name="" id="" className='medical-record-input' value={refillDate} onChange={(e) => setRefillDate(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Prescription Number</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={prescriptionNumber} onChange={(e) => setPrescriptionNumber(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Patient Id</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
                                <br />
                                <button type="submit" className='save-btn'>Save</button>
                                <button className='back-btn' onClick={handleBack}>Cancel</button>
                            </form>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default Pharmacy
