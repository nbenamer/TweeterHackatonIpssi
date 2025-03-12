import React from 'react';
import { Link } from 'react-router-dom';
import { MdHomeFilled } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import logo from '../svgs/logo.webp';

const Sidebar = () => {
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/auth/logout', { method: 'POST' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Something went wrong');
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: () => {
      toast.error('Logout failed');
    },
  });

  const { data: authUser } = useQuery({ queryKey: ['authUser'] });

  const menuItems = [
    { name: 'Home', path: '/', icon: <MdHomeFilled className='w-6 h-6 text-yellow-500' /> },
    { name: 'Notifications', path: '/notifications', icon: <IoNotifications className='w-6 h-6 text-yellow-500' /> },
    { name: 'Profile', path: `/profile/${authUser?.username}`, icon: <FaUser className='w-6 h-6 text-yellow-500' /> },
  ];

  return (
    <div className='w-70 h-screen p-4 border-r border-gray-700 ml'>
      <div className='flex justify-center mb-4'>
        <img src={logo} width={100} alt='Logo' />
      </div>
      <ul className='space-y-2'>
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className='flex items-center gap-3 p-3 text-lg font-medium text-gray-100 rounded-lg transition duration-300 hover:bg-gray-500 hover:font-bold'
            >
              {item.icon}
              <span className='hidden md:block'>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {authUser && (
        <div
        style={{marginLeft:-10}}
          className=' mt-auto mb-4 flex items-center gap-3 p-3 text-lg font-medium text-gray-100 rounded-lg transition duration-300 hover:bg-gray-500 cursor-pointer hover:font-bold'
          onClick={logout}
        >
          <BiLogOut className='w-8 h-8 text-yellow-800' />
          <span className='hidden md:block text-gray-100'>Logout</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
