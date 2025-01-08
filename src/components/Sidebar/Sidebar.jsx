import { Link } from 'react-router';
import './Sidebar.css';
import { useState } from 'react';
import SpeedIcon from '@mui/icons-material/Speed';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import PersonIcon from '@mui/icons-material/Person';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import VideocamIcon from '@mui/icons-material/Videocam';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// eslint-disable-next-line react/prop-types
const Sidebar = ({collapsed}) => {

    const [menuItemIndex, setMenuItemIndex] = useState(null); 
    const [openDropdown, setOpenDropdown] = useState(null); 

    const menuItems = [
        { name: 'Dashboard', icon: <SpeedIcon />, route: '/' }
    ];

    const proMenuItems = [
        {
            name: 'Genres',
            icon: <MusicNoteIcon />,
            options: [
                { name: 'All Genres', route: '/allGenres' },
                { name: 'Add Genre', route: '/addGenre' },
                { name: 'Edit Genre', route: '/editGenre' }
            ]
        },
        {
            name: 'Albums',
            icon: <SettingsVoiceIcon />,
            options: [
                { name: 'All Albums', route: '/allAlbums' },
                { name: 'Add Album', route: '/addAlbum' },
                { name: 'Edit Album', route: '/editAlbum' },
                { name: 'Album Detail', route: '/albumDetail' }
            ]
        },
        {
            name: 'Product',
            icon: <PersonIcon />,
            options: [
                { name: 'All Product', route: '/allProducts' },
                { name: 'Add Product', route: '/addProduct' },
                { name: 'Edit Product', route: '/editProduct' },
                { name: 'Product Detail', route: '/productDetail' }
            ]
        },
        { name: 'Audio', icon: <LibraryMusicIcon />, route: '/audio' },
        {
            name: 'Videos',
            icon: <VideocamIcon />,
            options: [
                { name: 'Video List', route: '/videoList' },
                { name: 'Video Detail', route: '/videoDetail' }
            ]
        },
        { name: 'Orders', icon: <ShoppingBagIcon />, route: '/orders' },
    ];

    const handleClick = (index) => {
        setMenuItemIndex(index);
    }

    const toggleDropdown = (index) => {

        if (openDropdown === index) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(index);
        }
    }

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="top-logo flex justify-between">
                <img src="../src/assets/images/logo/logo.png" alt="Logo" />
                <img src="../src/assets/images/logo/logo_black.png" className='me-[45px]' alt="Logo Black" />
            </div>
            <div className="menubar">
                <ul>
                    <span className='nav-small'>--- Personal</span>
                    {menuItems.map((item, index) => (
                        <li key={index} className={`flex items-center p-3 ${menuItemIndex === index ? 'text-[#01C0C8]' : '#6c757d'}`} onClick={() => handleClick(index)}>
                            <span className="icon me-2">
                                {item.icon}
                            </span>
                            <Link to={item.route} className="text-md menu-item">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <span className='nav-small'>--- Professional</span>
                    {proMenuItems.map((item, index) => (
                        <li key={index} className="flex flex-col items-start p-3 cursor-pointer">
                            <div
                                className={`flex items-center w-full ${openDropdown === index ? 'text-[#01C0C8]' : '#6c757d'}`}
                                onClick={() => toggleDropdown(index)} >
                                <span className="icon me-2">
                                    {item.icon}
                                </span>
                                <Link to={item.route} className={`text-md menu-item w-full  ${openDropdown === index ? 'text-[#01C0C8]' : 'text-[#6c757d'}`}>
                                    {item.name}
                                </Link>
                                
                                {item.name !== 'Audio' && item.name !== 'Orders' && (
                                    <ChevronRightIcon className={`transition-transform transform ${openDropdown === index ? 'rotate-90' : ''} ml-auto`} width={20} height={20} />
                                )}
                            </div>

                            {openDropdown === index && (
                                <div className="pl-8 pt-2 space-y-2 w-full">
                                    {item.options.map((option, idx) => (
                                        <div key={idx} className="text-sm cursor-pointer menu-option text-gray-700  hover:bg-gray-200">
                                            <Link to={option.route} className="text-sm">{option.name}</Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;