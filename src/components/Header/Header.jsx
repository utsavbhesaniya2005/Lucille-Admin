/* eslint-disable no-unused-vars */
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { alpha, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';
import { adminLogoutAsync } from '../../services/actions/AuthAction';

const navigation = [
    { name: 'Google Keep', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '14ch',
        '&:focus': {
          width: '48ch',
        },
      },
    },
  }));

// eslint-disable-next-line react/prop-types
const Header = ({ collapsed, toggleSidebar }) => {

    const { isSignIn, admin } = useSelector(state => state.AuthReducer);
    const [toggleHeader, setToggleHeader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        setToggleHeader(prevState => !prevState);
    }

    const handleLogout = () => {
        dispatch(adminLogoutAsync());
        navigate('/signIn');
    }

    return (
        <>
            <Disclosure as="nav" className={`header ${toggleHeader ? 'close-header' : ''} bg-white-800 fixed top-0 z-10 shadow-xl`}>
                <div className="max-w-8xl px-4 py-[2px] sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center cursor-pointer menu-icon">
                                <MenuIcon onClick={() => {toggleSidebar();handleClick();}} />
                            </div>
                        </div>
                        <div className="inset-y-0 flex items-center me-auto pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0">
                            <Search className='border-[1px] border-gray shadow-xl search rounded-full'>
                                <SearchIconWrapper className='search-icon'>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search & Enter"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </div>
                        <div className="inset-y-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ms-auto">
                            {
                                isSignIn ?  
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img alt="" src={admin.photoURL || "../src/assets/images/default-img/default-admin-img.png" } className="size-8 rounded-full" />
                                        </MenuButton>
                                    </div>
                                    <MenuItems transition className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in" >
                                        <MenuItem>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none" >Your Profile</a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none" >Settings</a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none" onClick={handleLogout} >Sign out</a>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                                :
                                <Link to='/signIn'>
                                    <Button className='btn1'>Sign In</Button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </Disclosure>
        </>
    )
}
export default Header;