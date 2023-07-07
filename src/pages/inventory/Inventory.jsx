import React from 'react'
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import '../styles.css';
const Inventory = () => {
  return (
    <div>
        <div className='dashboard-content'>
                <div className='dashbord-header-container'>
                    <button className='dashbord-header-btn'>New Inventory</button>
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
                    <h2>Inventory List</h2>
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
                        <th>QUANTITY</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>SUPPLIER</th>
                        <th>ACTIONS</th>
                    </thead>

                    {/* {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.id}</span></td>
                                    <td><span>{order.date}</span></td>
                                    <td>
                                        <div>
                                            {order.status === 'Paid' ?
                                                <img
                                                    src={DoneIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Canceled' ?
                                                <img
                                                    src={CancelIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Refunded' ?
                                                <img
                                                    src={RefundedIcon}
                                                    alt='refunded-icon'
                                                    className='dashboard-content-icon' />
                                            : null}
                                            <span>{order.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <img 
                                                src={order.avatar}
                                                className='dashboard-content-avatar'
                                                alt={order.first_name + ' ' +order.last_name} />
                                            <span>{order.first_name} {order.last_name}</span>
                                        </div>
                                    </td>
                                    <td><span>{order.product}</span></td>
                                    <td><span>${order.price}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                } */}
                </table>
            </div>
        </div>
    </div>
  )
}

export default Inventory