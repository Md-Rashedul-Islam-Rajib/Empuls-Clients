import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'

const Navbar = () => {

    const navs =    <>
                    <NavLink to='/'> <li>Home</li> </NavLink>
    <NavLink to='/dashboard'> <li>Dashboard</li> </NavLink>
    <NavLink to='/contact-us'> <li>Contact Us</li> </NavLink>
    <NavLink to='/register'> <li>Register</li> </NavLink>
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
  <ul className="menu menu-horizontal gap-4 px-1 mr-4">
      {navs}
    </ul>
    <Link to='/login'><button  className="btn bg-[#6F42C1] text-white">Login</button> </Link>
  </div>
</div>
        </div>
    );
};

export default Navbar;