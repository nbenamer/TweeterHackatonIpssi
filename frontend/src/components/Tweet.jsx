import React from 'react';

const Tweet = ({ username, content, date }) => {
  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">{username}</span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <div className="text-gray-700">{content}</div>
    </div>
  );
};

export default Tweet;
