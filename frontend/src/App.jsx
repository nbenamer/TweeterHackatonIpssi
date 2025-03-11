import React, { useState } from 'react';
import Navbar from './components/Navbar'; // Importez Navbar depuis son fichier spécifique
import Sidebar from './components/Sidebar'; // Importez Sidebar depuis son fichier spécifique
import TweetList from './components/TweetList'; // Importez TweetList depuis son fichier spécifique
import PostTweet from './components/PostTweet'; // Importez PostTweet depuis son fichier spécifique
const App = () => {
  const [tweets, setTweets] = useState([]);

  const handlePostTweet = (content) => {
    const newTweet = {
      username: 'YourUsername',
      content,
      date: new Date().toLocaleDateString(),
    };
    setTweets([newTweet, ...tweets]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          <PostTweet onPost={handlePostTweet} />
          <TweetList tweets={tweets} />
        </div>
      </div>
    </div>
  );
};

export default App;