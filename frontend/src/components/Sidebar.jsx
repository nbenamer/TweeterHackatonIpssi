import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      <ul className="space-y-2">
        <li className="hover:bg-gray-200 p-2 rounded">Home</li>
        <li className="hover:bg-gray-200 p-2 rounded">Explore</li>
        <li className="hover:bg-gray-200 p-2 rounded">Notifications</li>
        <li className="hover:bg-gray-200 p-2 rounded">Messages</li>
        <li className="hover:bg-gray-200 p-2 rounded">Bookmarks</li>
        <li className="hover:bg-gray-200 p-2 rounded">Lists</li>
        <li className="hover:bg-gray-200 p-2 rounded">Profile</li>
        <li className="hover:bg-gray-200 p-2 rounded">More</li>
      </ul>
    </div>
  );
};

export default Sidebar;
