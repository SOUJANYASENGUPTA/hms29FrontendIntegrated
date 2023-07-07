import React, { useEffect, useState } from 'react'
import '../styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import axios from 'axios';
import './MedicalRecord.css'
import Swal from 'sweetalert2';
import '../../components/DashboardHeader/styles.css'

const MedicalRecord = () => {
    const [records, setRecords] = useState([]);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [recordId, setRecordId] = useState('')
    const [patientId, setPatientId] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('')
    const [prescription, setPrescription] = useState('')
    const [error, setError] = useState("")
    const [checkValid, setCheckValid] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const fetchRecords = async () => {
        await axios.get('http://localhost:8080/medical-records').then((response) => {
            setRecords(response.data);
        })
    }
    useEffect(() => {
        fetchRecords();
    }, [])
    const SubmitDelete = async (id) => {
        await axios.delete(`http://localhost:8080/medical-records/${id}`).then(() => {
            console.log("in delete")
            fetchRecords();
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
                    title: 'Record Deleted',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }
    const handleEdit = (record) => {
        setEdit(true);
        setRecordId(record.id);
        setPatientId(record.patient_id)
        setDoctorId(record.doctor_id)
        setDiagnosis(record.diagnosis)
        setPrescription(record.prescription)
        setNotes(record.notes)
        setDate(record.date)
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
        const formattedDate = new Date(date).toISOString().split('T')[0];
        console.log(date);
        const updatedRecord = {
            id: recordId,
            patient_id: patientId,
            doctor_id: doctorId,
            diagnosis: diagnosis,
            date: formattedDate,
            prescription: prescription,
            notes: notes
        }

        await axios.put(`http://localhost:8080/medical-records`, updatedRecord).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Record Updated Successfully',
                showConfirmButton: false,
                timer: 1000
            })
            setEdit(false);
            clearFields();
            fetchRecords();
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleAddSubmit = async (e) => {
        console.log(patientId)
        e.preventDefault();
        var formattedDate = new Date(date).toISOString().split('T')[0];
        const record = {
            patient_id: patientId,
            doctor_id: doctorId,
            date: formattedDate,
            diagnosis: diagnosis,
            prescription: prescription,
            notes: notes
        }
        console.log(record)
        await axios.post('http://localhost:8080/medical-records', record).then((response) => {
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Record Added',
                showConfirmButton: false,
                timer: 1000
            })
            fetchRecords();
            setAdd(false);
            clearFields();
        })
    }
    const clearFields = () => {
        setRecordId('')
        setDiagnosis('')
        setDoctorId('')
        setPatientId('')
        setPrescription('')
        setNotes('')
        setDate('')
    }
    return (
        <div>
            <div className='dashboard-content'>
                <div className='dashbord-header-container'>
                    {!edit && !add && <button className='dashbord-header-btn' onClick={handleNewRecord}>New Record</button>}
                    {(edit || add) && <button className='dashbord-header-btn' onClick={handleBack}>Back to Records</button>}
                    <div className='dashbord-header-right'>
                        <img
                            src={NotificationIcon}
                            alt='notification-icon'
                            className='dashbord-header-icon' />
                        <img
                            src={SettingsIcon}
                            alt='settings-icon'
                            className='dashbord-header-icon' />
                        <img
                            className='dashbord-header-avatar'
                            src='https://reqres.in/img/faces/9-image.jpg' />
                    </div>
                </div>
                {!edit && !add && <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Medical Records List</h2>
                        <div className='dashboard-content-search'>
                            <input
                                type='number'
                                placeholder='Search...'
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
                            <th>DATE</th>
                            <th>DIAGNOSIS</th>
                            <th>PRESCRIPTION</th>
                            <th>NOTES</th>
                            <th>PATIENT ID</th>
                            <th>DOCTOR ID</th>
                            <th>ACTIONS</th>
                        </thead>
                        {records.length !== 0 ?
                            <tbody>
                                {records
                                    .filter(record => {
                                        return (
                                            record.id.toString().includes(searchQuery)
                                        );
                                    }).map((record) => {
                                        return <tr key={record.id}>
                                            <td><span>{record.id}</span></td>
                                            <td><span>{record.date}</span></td>
                                            <td><span>{record.diagnosis.length < 14 ? record.diagnosis : record.diagnosis.substring(0, 14) + "..."}</span></td>
                                            <td><span>{record.prescription.length < 14 ? record.prescription : record.prescription.substring(0, 14) + "..."}</span></td>
                                            <td><span>{record.notes.length < 14 ? record.notes : record.notes.substring(0, 14) + "..."}</span></td>
                                            <td><span>{record.patient_id}</span></td>
                                            <td><span>{record.doctor_id}</span></td>
                                            <td>
                                                <button onClick={() => handleEdit(record)} className='edit-save-btn'>Edit</button>
                                                <button onClick={() => handleDelete(record.id)} className='edit-back-btn'>Delete</button>
                                                <button className='view-btn'>View</button>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>:<>Not found</>
                        }
                    </table>
                </div>}
                {edit &&
                    <div className='medical-record-form'>
                        <div className='dashboard-content-header'>
                            <h2>Edit Medical Record</h2>
                        </div>
                        <div>
                            <form onSubmit={handleEditSubmit}>
                                <label htmlFor="">Patient Id</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Doctor Id</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Date Of Record</label>
                                <br />
                                <input type="date" name="" id="" className='medical-record-input' value={date} onChange={(e) => setDate(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Dignosis</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Prescription</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={prescription} onChange={(e) => setPrescription(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Notes</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={notes} onChange={(e) => setNotes(e.target.value)} required />
                                <br />
                                <button type="submit" className='save-btn'>Update</button>
                                <button className='back-btn' onClick={handleBack}>Cancel</button>

                            </form>
                        </div>

                    </div>
                }
                {add &&
                    <div className='medical-record-form'>
                        <div className='dashboard-content-header'>
                            <h2>Add Medical Record</h2>
                        </div>
                        <div>
                            <form onSubmit={handleAddSubmit}>
                                <label htmlFor="">Patient Id</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Doctor Id</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Date Of Record</label>
                                <br />
                                <input type="date" name="" id="" className='medical-record-input' value={date} onChange={(e) => setDate(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Dignosis</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Prescription</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={prescription} onChange={(e) => setPrescription(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Notes</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={notes} onChange={(e) => setNotes(e.target.value)} required />
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

export default MedicalRecord