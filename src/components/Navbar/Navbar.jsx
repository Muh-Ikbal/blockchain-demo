import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <>
      <div className='flex justify-between items-center fixed w-full bg-gradient-to-r from-blue/20 to-white/10 backdrop-blur-lg border border-white/20 p-4 shadow-xl text-white z-50'>
        <div className='logo font-bold'>Blockchain Demo Transactions</div>
        <div className='nav-link flex gap-4'>
          <NavLink to='/' end>
            Home
          </NavLink>
          <NavLink to='/hash' end>
            Hash
          </NavLink>
          <NavLink to='/block' end>
            Block
          </NavLink>
          <NavLink to='/blockchain' end>
            Blockchain
          </NavLink>
          <NavLink to='/transaction' end>
            Transaction
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
