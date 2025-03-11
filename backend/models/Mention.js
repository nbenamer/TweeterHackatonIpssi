import mongoose from 'mongoose';

const mentionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true
  },
  userMentioned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Mention = mongoose.models.Mention || mongoose.model('Mention', mentionSchema);

export default Mention;
