import React from 'react';
import Tweet from './Tweet';

const TweetList = ({ tweets }) => {
  return (
    <div className="space-y-4">
      {tweets.map((tweet, index) => (
        <Tweet key={index} username={tweet.username} content={tweet.content} date={tweet.date} />
      ))}
    </div>
  );
};

export default TweetList;
