import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: UserIcon,
        path: '/patients',
        title: 'Patient',
    },
    {
        id: 2,
        icon: ShippingIcon,
        path: '/staff',
        title: 'Staff',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/pharmacy',
        title: 'Pharmacy',
    },
    {
        id: 4,
        icon: ShippingIcon,
        path: '/inventory',
        title: 'Inventory',
    },
    {
        id: 5,
        icon: ShippingIcon,
        path: '/records',
        title: 'Medical Records',
    },
    /* {
        id: 6,
        icon: UserIcon,
        path: '/appointment',
        title: 'Appointments',
    },
    {
        id: 7,
        icon: UserIcon,
        path: '/billing',
        title: 'Billing',
    } */
    {
        id: 6,
        icon: ShippingIcon,
        path: '/appointment',
        title: 'Appointment',
    },
    {
        id: 7,
        icon: ShippingIcon,
        path: '/billing',
        title: 'Billing',
    }
]

export default sidebar_menu;