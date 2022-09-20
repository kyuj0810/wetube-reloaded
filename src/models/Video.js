import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trime: true, maxlength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: { type: String, required: true, trime: true, minLength: 2 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trime: true }],
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Comment' },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
})

videoSchema.static('formatHashtags', function (hashtags) {
  return hashtags
    .split(',')
    .map((word) => (word.startsWith('#') ? word : `#${word}`))
})

// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// });

const Video = mongoose.model('Video', videoSchema)
export default Video
