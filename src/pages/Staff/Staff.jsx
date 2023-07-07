import React, { useEffect, useState } from 'react'
import '../styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import axios from 'axios';
import '../MedicalRecords/MedicalRecord.css'
import Swal from 'sweetalert2';
const Staff = () => {
    const [staff, setStaff] = useState([]);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [staffId, setstaffId] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [salary, setSalary] = useState('');
    const[searchQuery,setSearchQuery]=useState('');
    const fetchstaffs = async () => {
        await axios.get('http://localhost:8080/staff').then((response) => {
            setStaff(response.data);
        })
    }
    useEffect(() => {
        fetchstaffs();
    }, [])
    const SubmitDelete = async (id) => {
        await axios.delete(`http://localhost:8080/staff/${id}`).then(() => {
            console.log("in delete")
            fetchstaffs();
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
                    title: 'staff Deleted',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }
    const handleEdit = (staff) => {
        setEdit(true);
        setName(staff.name)
        setAddress(staff.address)
        setAge(staff.age)
        setGender(staff.gender)
        setstaffId(staff.id)
        setEmail(staff.email)
        setPhone(staff.phone)
        setJobTitle(staff.jobTitle);
        setSalary(staff.salary)

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
        const updatedstaff = {
            id: staffId,
            name: name,
            age: age,
            gender: gender,
            address: address,
            phone: phone,
            email: email,
            jobTitle: jobTitle,
            salary: salary
        }
        console.log(updatedstaff)
        await axios.put(`http://localhost:8080/staff`, updatedstaff).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'staff Updated Successfully',
                showConfirmButton: false,
                timer: 1000
            })
            setEdit(false);
            clearFields();
            fetchstaffs();
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const staff = {
            name: name,
            age: age,
            gender: gender,
            address: address,
            phone: phone,
            email: email,
            jobTitle: jobTitle,
            salary: salary
        }
        console.log(staff)
        await axios.post('http://localhost:8080/staff', staff).then((response) => {
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'staff Added',
                showConfirmButton: false,
                timer: 1000
            })
            fetchstaffs();
            setAdd(false);
            clearFields();
        })
    }
    const clearFields = () => {
        setName('')
        setAddress('')
        setAge('')
        setGender('')
        setstaffId('')
        setEmail('')
        setPhone('')
        setJobTitle('')
        setSalary();
    }
    return (
        <div>
            <div className='dashboard-content'>
                <div className='dashbord-header-container'>
                    {!edit && !add && <button className='dashbord-header-btn' onClick={handleNewRecord}>New staff</button>}
                    {(edit || add) && <button className='dashbord-header-btn' onClick={handleBack}>Back to staffs</button>}
                    <div className='dashbord-header-right'>
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
                    </div>
                </div>
                {!edit && !add && <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Staff List</h2>
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
                            <th>JOB TITLE</th>
                            <th>SALARY</th>
                            <th>Actions</th>
                        </thead>
                        {staff.length !== 0 &&
                            <tbody>
                                {staff
                                    .filter(staff => {
                                        return (
                                            staff.id.toString().includes(searchQuery) || staff.name.toLowerCase().includes(searchQuery)
                                        );
                                    })
                                    .map((staff) => {
                                        return <tr key={staff.id}>
                                            <td><span>{staff.id}</span></td>
                                            <td><span>{staff.name}</span></td>
                                            <td><span>{staff.age}</span></td>
                                            <td><span>{staff.gender}</span></td>
                                            <td><span>{staff.address}</span></td>
                                            <td><span>{staff.phone}</span></td>
                                            <td><span>{staff.email}</span></td>
                                            <td><span>{staff.jobTitle}</span></td>
                                            <td><span>{staff.salary}</span></td>
                                            {/* <td><span>{staff.treatmentPlan}</span></td> */}
                                            <td>
                                                <button onClick={() => handleEdit(staff)} className='edit-save-btn'>Edit</button>
                                                <button onClick={() => handleDelete(staff.id)} className='edit-back-btn'>Delete</button>
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
                            <h2>Edit staff Details</h2>
                        </div>
                        <div>
                            <form onSubmit={handleEditSubmit}>
                                <label htmlFor="">staff Id</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={staffId} onChange={(e) => setstaffId(e.target.value)} readOnly />
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
                                <label htmlFor="" className='form_label'>Job Title</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Salary</label>
                                <br />
                                <input type="number" name="" id="" className='medical-record-input' value={salary} onChange={(e) => setSalary(e.target.value)} required />
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
                            <h2>Add Medical Record</h2>
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
                                <label htmlFor="" className='form_label'>Job Title</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
                                <br />
                                <label htmlFor="" className='form_label'>Salary</label>
                                <br />
                                <input type="text" name="" id="" className='medical-record-input' value={salary} onChange={(e) => setSalary(e.target.value)} required />
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

export default Staff






// import React from 'react'
// import NotificationIcon from '../../assets/icons/notification.svg';
// import SettingsIcon from '../../assets/icons/settings.svg';
// import '../styles.css';
// const staff = () => {
//     return (
//         <div>
//             <div className='dashboard-content'>
//                 <div className='dashbord-header-container'>
//                     <button className='dashbord-header-btn'>New staff</button>
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
//                         <h2>staff List</h2>
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

// export default staff

// import React from 'react'
// import DashboardHeader from '../../components/DashboardHeader'
// import '../styles.css';
// const Staff = () => {
//   return (
//     <div>
//         <div className='dashboard-content'>
//             <DashboardHeader
//                 btnText="New Staff" />
//             <div className='dashboard-content-container'>
//                 <div className='dashboard-content-header'>
//                     <h2>Staff List</h2>
//                     <div className='dashboard-content-search'>
//                         <input
//                             type='text'
//                             placeholder='Search..'
//                             className='dashboard-content-input'
//                            />
//                     </div>
//                 </div>
//                 <table>
//                     <thead>
//                         <th>ID</th>
//                         <th>NAME</th>
//                         <th>AGE</th>
//                         <th>GENDER</th>
//                         <th>ADDRESS</th>
//                         <th>PHONE</th>
//                         <th>JOB TITLE</th>
//                         <th>EMAIL</th>
//                         <th>SALARY</th>
//                         <th>BENIFITS</th>
//                         <th>ACTIONS</th>
//                     </thead>
//                 </table>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Staff