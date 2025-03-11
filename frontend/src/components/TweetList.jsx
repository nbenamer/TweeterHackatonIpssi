import React from 'react';

const TweetList = ({ tweets }) => {
  console.log("Tweets reçus :", tweets); // Vérifiez les données reçues

  return (
    <div>
      {tweets.map((tweet, index) => {
        console.log("Tweet individuel :", tweet); // Vérifiez chaque tweet
        return (
          <div key={index} className="border p-4 mb-4">
            <p className="font-bold" style={{ color: 'black' }}>{tweet.username}</p>
            <p>{tweet.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(tweet.date).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TweetList;