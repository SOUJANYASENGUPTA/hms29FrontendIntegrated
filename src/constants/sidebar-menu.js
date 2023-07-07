import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/patients',
        title: 'Patient',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/staff',
        title: 'Staff',
    },
    {
        id: 4,
        icon: ShippingIcon,
        path: '/pharmacy',
        title: 'Pharmacy',
    },
    {
        id: 5,
        icon: ShippingIcon,
        path: '/inventory',
        title: 'Inventory',
    },
    {
        id: 6,
        icon: ShippingIcon,
        path: '/records',
        title: 'Medical Records',
    },
    {
        id: 7,
        icon: UserIcon,
        path: '/profile',
        title: 'My account',
    }
]

export default sidebar_menu;