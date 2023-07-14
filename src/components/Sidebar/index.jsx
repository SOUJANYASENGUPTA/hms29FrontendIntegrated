import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import SideBarItem from './sidebar-item';

import './styles.css';
import logo from '../../assets/images/neww-logo.png'
import LogoutIcon from '../../assets/icons/logout.svg';

function SideBar ({ menu , signOut, user }) {
    const location = useLocation();

    const [active, setActive] = useState(1);

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }

    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    {/* <img
                        src={logo}
                        alt="logo" /> */}
                    <h2 style={{color:"white"}}>HMS TEAM-29</h2>
                </div>
                {/* <span className='sidebar-item-label' style={{color:'white',marginLeft:"2rem"}}>Welcome {user.phoneNumber}</span> */}
                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    <div className='sidebar-footer' onClick={signOut}>
                        <span className='sidebar-item-label'>Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon' />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;