import mongoose from 'mongoose';

const hashtagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    unique: true
  },
  tweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet'
  }]
});

const Hashtag = mongoose.models.Hashtag || mongoose.model('Hashtag', hashtagSchema);

export default Hashtag;
