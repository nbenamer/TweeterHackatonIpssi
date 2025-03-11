import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TweetList from './components/TweetList';
import PostTweet from './components/PostTweet';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import More from './pages/More';

const App = () => {
  const [tweets, setTweets] = useState([]);

  const handlePostTweet = (content) => {
    const newTweet = {
      username: 'YourUsername',
      content,
      date: new Date().toISOString(),
    };
    setTweets([newTweet, ...tweets]);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <PostTweet onPost={handlePostTweet} />
                    <TweetList tweets={tweets} setTweets={setTweets} />
                  </>
                }
              />
              <Route path="/explore" element={<Explore />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/more" element={<More />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;