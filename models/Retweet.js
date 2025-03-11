import mongoose from 'mongoose';

const retweetSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Retweet = mongoose.models.Retweet || mongoose.model('Retweet', retweetSchema);

export default Retweet;
