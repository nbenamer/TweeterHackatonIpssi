import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  }],
  hashtags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hashtag'
  }],
  mentions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mention'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like'
  }],
  retweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retweet'
  }],
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  }],
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bookmark'
  }]
});

const Tweet = mongoose.models.Tweet || mongoose.model('Tweet', tweetSchema);

export default Tweet;
