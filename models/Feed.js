import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet'
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Feed = mongoose.models.Feed || mongoose.model('Feed', feedSchema);

export default Feed;
