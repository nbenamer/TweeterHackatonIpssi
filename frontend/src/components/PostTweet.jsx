import React, { useState } from 'react';

const PostTweet = ({ onPost }) => {
  const [tweetContent, setTweetContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tweetContent.trim()) return;
    onPost(tweetContent);
    setTweetContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
        placeholder="What's happening?"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Tweet
      </button>
    </form>
  );
};

export default PostTweet;
