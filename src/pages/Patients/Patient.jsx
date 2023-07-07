import React, { useEffect, useState } from 'react'
import '../styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import axios from 'axios';
import '../MedicalRecords/MedicalRecord.css'
import Swal from 'sweetalert2';
const Patient = () => {
    const [patients, setPatients] = useState([]);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [patientId, setPatientId] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [medicalHistory, setMedicalHistory] = useState('')
    const [treatmentPlan, setTreatmentPlan] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const fetchPatients = async () => {
        await axios.get('http://localhost:8080/patient').then((response) => {
            setPatients(response.data);
        })
    }
    useEffect(() => {
        fetchPatients();
    }, [])
    const SubmitDelete = async (id) => {
        await axios.delete(`http://localhost:8080/patient/${id}`).then(() => {
            console.log("in delete")
            fetchPatients();
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
                    title: 'Patient Deleted',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }
    const handleEdit = (patient) => {
        setEdit(true);
        setName(patient.name)
        setAddress(patient.address)
        setAge(patient.age)
        setGender(patient.gender)
        setPatientId(patient.id)
        setEmail(patient.email)
        setPhone(patient.phone)
        setTreatmentPlan(patient.treatmentPlan)
        setMedicalHistory(patient.medicalHistory);

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
        const updatedPatient = {
            id: patientId,
            name: name,
            age: age,
            gender: gender,
            address: address,
            phone: phone,
            email: email,
            medicalHistory: medicalHistory,
            treatmentPlan: treatmentPlan
        }
        console.log(updatedPatient)
        await axios.put(`http://localhost:8080/patient`, updatedPatient).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Patient Updated Successfully',
                showConfirmButton: false,
                timer: 1000
            })
            setEdit(false);
            clearFields();
            fetchPatients();
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const patient = {
            name: name,
            age: age,
            gender: gender,
            address: address,
            phone: phone,
            email: email,
            medicalHistory: medicalHistory,
            treatmentPlan: treatmentPlan
        }
        console.log(patient)
        await axios.post('http://localhost:8080/patient', patient).then((response) => {
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Patient Added',
                showConfirmButton: false,
                timer: 1000
            })
            fetchPatients();
            setAdd(false);
            clearFields();
        })
    }
    const clearFields = () => {
        setName('')
        setAddress('')
        setAge('')
        setGender('')
        setPatientId('')
        setEmail('')
        setPhone('')
        setTreatmentPlan('')
        setMedicalHistory('')
    }
    return (
        <div>
            <div className='dashboard-content'>
                <div className='dashbord-header-container'>
                    {!edit && !add && <button className='dashbord-header-btn' onClick={handleNewRecord}>New Patient</button>}
                    {(edit || add) && <button className='dashbord-header-btn' onClick={handleBack}>Back to Patients</button>}
                    <div className='dashbord-header-right'>
                        <img
                            src={NotificationIcon}
                            alt='notification-icon'
                            className='dashbord-header-icon' />
                        <img
                            src={SettingsIcon}
                            alt="settings icon"
                            className='dashbord-header-icon' />
                        <img
                            className='dashbord-header-avatar'
                            src='https://reqres.in/img/faces/9-image.jpg' alt="dash img here" />
                    </div>
                </div>
                {!edit && !add && <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Patients List</h2>
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
                            <th>NAME</th>
                            <th>AGE</th>
                            <th>GENDER</th>
                            <th>ADDRESS</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            {/* <th>MEDICAL HISTORY</th> */}
                            {/* <th>TREATMENT PLAN</th> */}
                            <th>Actions</th>
                        </thead>
                        {patients.length !== 0 &&
                            <tbody>
                                {patients
                                    .filter(patient => {
                                        return (
                                            patient.id.toString().includes(searchQuery) || patient.name.toLowerCase().includes(searchQuery)
                                        );
                                    })
                                    .map((patient) => {
                                        return <tr key={patient.id}>
                                            <td><span>{patient.id}</span></td>
                                            <td><span>{patient.name}</span></td>
                                            <td><span>{patient.age}</span></td>
                                            <td><span>{patient.gender}</span></td>
                                            <td><span>{patient.address}</span></td>
                                            <td><span>{patient.phone}</span></td>
                                            <td><span>{patient.email}</span></td>
                                            {/* <td><span>{patient.medicalHistory}</span></td> */}
                                            {/* <td><span>{patient.treatmentPlan}</span></td> */}
                                            <td>
                                                <button onClick={() => handleEdit(patient)} className='edit-save-btn'>Edit</button>
                                                <button onClick={() => handleDelete(patient.id)} className='edit-back-btn'>Delete</button>
                                                <button className='view-btn'>View</button>
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
                            <h2>Edit Patient Details</h2>
                        </div>
                        <div>
                            <form onSubmit={handleEditSubmit}>
                                <label htmlFor="">Patient Id</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={patientId} onChange={(e) => setPatientId(e.target.value)} readOnly />
                                <br />
                                <label htmlFor="" className='form_label'>Name</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={name} onChange={(e) => setName(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Age</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={age} onChange={(e) => setAge(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Gender</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={gender} onChange={(e) => setGender(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Address</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={address} onChange={(e) => setAddress(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Phone</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Email</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Medical History</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Treatment Plan</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={treatmentPlan} onChange={(e) => setTreatmentPlan(e.target.value)} required />
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
                            <h2>Patient Registration</h2>
                        </div>
                        <div>
                            <form onSubmit={handleAddSubmit}>
                                <label htmlFor="" className='form_label'>Name</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={name} onChange={(e) => setName(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Age</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={age} onChange={(e) => setAge(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Gender</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={gender} onChange={(e) => setGender(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Address</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={address} onChange={(e) => setAddress(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Phone</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Email</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Medical History</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Treatment Plan</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={treatmentPlan} onChange={(e) => setTreatmentPlan(e.target.value)} required />
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

export default Patient






// import React from 'react'
// import NotificationIcon from '../../assets/icons/notification.svg';
// import SettingsIcon from '../../assets/icons/settings.svg';
// import '../styles.css';
// const Patient = () => {
//     return (
//         <div>
//             <div className='dashboard-content'>
//                 <div className='dashbord-header-container'>
//                     <button className='dashbord-header-btn'>New Patient</button>
//                     <div className='dashbord-header-right'>
//                         <img
//                             src={NotificationIcon}
//                             alt='notification-icon'
//                             className='dashbord-header-icon' />
//                         <img
//                             src={SettingsIcon}
//                             alt='settings-icon'
//                             className='dashbord-header-icon' />
//                         <img
//                             className='dashbord-header-avatar'
//                             src='https://reqres.in/img/faces/9-image.jpg' />
//                     </div>
//                 </div>
//                 <div className='dashboard-content-container'>
//                     <div className='dashboard-content-header'>
//                         <h2>Patient List</h2>
//                         <div className='dashboard-content-search'>
//                             <input
//                                 type='text'
//                                 placeholder='Search..'
//                                 className='dashboard-content-input'
//                             />
//                         </div>
//                     </div>
//                     <table>
//                         <thead>
//                             <th>ID</th>
//                             <th>NAME</th>
//                             <th>AGE</th>
//                             <th>GENDER</th>
//                             <th>ADDRESS</th>
//                             <th>PHONE</th>
//                             <th>EMAIL</th>
//                             <th>MEDICAL HISTORY</th>
//                             <th>TREATMENT PLAN</th>
//                             <th>ACTIONS</th>
//                         </thead>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Patient