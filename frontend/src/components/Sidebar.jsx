import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Messages', path: '/messages' },
    { name: 'Bookmarks', path: '/bookmarks' },
    { name: 'Profile', path: '/profile' },
    { name: 'More', path: '/more' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="block p-3 text-lg font-medium text-gray-800 rounded-lg transition duration-300 hover:bg-gray-300 hover:font-bold"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
