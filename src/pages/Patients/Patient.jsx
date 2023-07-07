import React from 'react'
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import '../styles.css';
const Patient = () => {
    return (
        <div>
            <div className='dashboard-content'>
                <div className='dashbord-header-container'>
                    <button className='dashbord-header-btn'>New Patient</button>
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
                <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Patient List</h2>
                        <div className='dashboard-content-search'>
                            <input
                                type='text'
                                placeholder='Search..'
                                className='dashboard-content-input'
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
                            <th>MEDICAL HISTORY</th>
                            <th>TREATMENT PLAN</th>
                            <th>ACTIONS</th>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Patient