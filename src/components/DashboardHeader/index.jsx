import React from 'react';

import './styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';

function DashboardHeader ({ btnText, onClick }) {
    return(
        <div>
            {btnText && 
                <button className='dashbord-header-btn' onClick={onClick}>{btnText}</button>
            }
        </div>
    )
}

export default DashboardHeader;