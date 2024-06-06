import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { AuthContext } from '../../context/AuthProvider';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import userimage from "../../assets/user.png"
const Navbar = () => {

  const {user,logOutUser} = useContext(AuthContext);

  // todo: image from data base in the navbar

  console.log(user)
  const handleSignOut = () => {
    logOutUser()
    toast.success('Logged out successfully')
    
  }
    const navs =    <>
                    <NavLink to='/'> <li>Home</li> </NavLink>
    <NavLink to='/dashboard'> <li>Dashboard</li> </NavLink>
    <NavLink to='/contact-us'> <li>Contact Us</li> </NavLink>
    {!user && <NavLink to='register'> <li>Register</li> </NavLink>}
                    </>
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navs}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">
        <img src={logo} className='h-10' alt="" />
    </a>
  </div>
  {/* <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal gap-4 px-1">
      {navs}
    </ul>
  </div> */}
  <div className="navbar-end">
  <ul className="menu menu-horizontal gap-4 px-1 mr-4 hidden lg:flex">
      {navs}
    </ul>
    
    {user ? 
            
            <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
            {user ? <img className='rounded-full' src={user?.photoURL} />:
            <img className='rounded-full' src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            }
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-24">
            <button onClick={handleSignOut} className="btn btn-sm bg-[#6f42c1] text-sm text-white">Log Out</button>
            </ul>
          </div>
           
        : <Link to='/login'><button  className="btn bg-[#6F42C1] text-white">Login</button> </Link> }
  </div>
</div>
<Toaster />
        </div>
    );
};

// <button onClick={handleSignOut} className="btn bg-[#FEA116] text-white">Log Out</button>
export default Navbar;