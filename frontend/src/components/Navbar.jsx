import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div className="text-xl font-bold">Tweeter</div>
      <div className="flex space-x-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="/profile" className="hover:underline">Profile</a>
      </div>
    </nav>
  );
};

export default Navbar;
