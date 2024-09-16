import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../context/AuthProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import userimage from "../../assets/user.png";
import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from '../../hooks/useAxiosPublic';

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const dropdownRef = useRef(null);

  const { data: userInfo = [] } = useQuery({
    queryKey: ['navbar', user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get('/users', {
        params: { email: user?.email },
      });
      return response.data;
    },
  });

  const handleSignOut = () => {
    logOutUser();
    toast.success('Logged out successfully');
  };

  // Handle clicking outside of dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if click outside
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const navs = (
    <>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `block py-1 px-2 ${
            isActive ? 'bg-[#6F42C1] text-white' : 'text-black'
          } text-center font-medium rounded-lg`
        }
      >
        <li>Home</li>
      </NavLink>
      <NavLink
        to='/dashboard'
        className={({ isActive }) =>
          `block py-1 px-2 ${
            isActive ? 'bg-[#6F42C1] text-white' : 'text-black'
          } text-center font-medium rounded-lg`
        }
      >
        <li>Dashboard</li>
      </NavLink>
      <NavLink
        to='/contact-us'
        className={({ isActive }) =>
          `block py-1 px-2 ${
            isActive ? 'bg-[#6F42C1] text-white' : 'text-black'
          } text-center font-medium rounded-lg`
        }
      >
        <li>Contact Us</li>
      </NavLink>
      {!user && (
        <NavLink
          to='register'
          className={({ isActive }) =>
            `block py-1 px-2 ${
              isActive ? 'bg-[#6F42C1] text-white' : 'text-black'
            } text-center font-medium rounded-lg`
          }
        >
          <li>Register</li>
        </NavLink>
      )}
    </>
  );

  return (
    <nav>
      <div className='navbar bg-base-100 pr-8'>
        <div className='navbar-start'>
          {/* Toggle Button for Mobile */}
          <div className='dropdown'>
            <button
              tabIndex={0}
              role='button'
              className='btn btn-ghost lg:hidden'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle state
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </button>
            {/* Conditional Rendering for Mobile Menu */}
            {isMobileMenuOpen && (
              <ul className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 z-10 rounded-box w-52'>
                {navs}
              </ul>
            )}
          </div>

          {/* Logo */}
          <a className='btn btn-ghost text-xl'>
            <Link to='/'>
              <img src={logo} className='h-10' alt='' />
            </Link>
          </a>
        </div>

        <div className='navbar-end'>
          {/* Navigation Links for Desktop */}
          <ul className='menu menu-horizontal gap-4 px-1 mr-4 hidden lg:flex'>
            {navs}
          </ul>

          {/* User Dropdown */}
          {user ? (
            <div className='relative' ref={dropdownRef}>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {userInfo ? (
                  <img className='rounded-full' src={userInfo?.image} alt='User' />
                ) : (
                  <img className='rounded-full' src={userimage} alt='Default' />
                )}
              </div>

              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className='absolute left-0 mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-24'
                  style={{ top: '100%', transform: 'translateX(-20%)' }} // Adjust this value as needed
                >
                  <button
                    onClick={handleSignOut}
                    className='btn btn-sm bg-[#6f42c1] text-sm text-white'
                  >
                    Log Out
                  </button>
                </ul>
              )}
            </div>
          ) : (
            <Link to='/login'>
              <button className='btn bg-[#6F42C1] text-white'>Login</button>
            </Link>
          )}
        </div>
      </div>
      <Toaster />
    </nav>
  );
};

export default Navbar;
