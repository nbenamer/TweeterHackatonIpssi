import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video', 'gif'],
    required: true
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true
  }
});

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);

export default Media;
