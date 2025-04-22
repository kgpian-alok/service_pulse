import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-orange-600 text-white px-8 py-4 flex justify-between shadow">
      <span className="text-2xl font-bold tracking-wide">Service Pulse</span>
      <div className="flex space-x-6 items-center">
        {role === 'admin' && <span>Hello Admin</span>}
        {role === 'customer' && <span>Hello Customer</span>}
        {role && (
          <button onClick={handleLogout} className="hover:underline text-white">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
