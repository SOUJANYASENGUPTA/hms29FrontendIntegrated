import React from 'react'
import '../styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
const Pharmacy = () => {
    return (
        <div>
            <div className='dashboard-content'>
                <div className='dashbord-header-container'>
                    <button className='dashbord-header-btn'>New Pharmacy</button>
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
                {<div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Pharmacy List</h2>
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
                            <th>MEDICATION NAME</th>
                            <th>DOSAGE</th>
                            <th>REFILL DATE</th>
                            <th>PRESCRIPTION</th>
                            <th>PATIENT ID</th>
                            <th>ACTIONS</th>
                        </thead>
                    </table>
                </div>}
            </div>
        </div>
    )
}

export default Pharmacy