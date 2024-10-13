const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const animeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    likes: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 10 },
    starred: { type: Number, default: 0 },
    liked_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    starred_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    thumbnail_url: { type: String, required: true },
    stream_url: { type: String },
    is_live: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Anime = mongoose.model("Anime", animeSchema);
module.exports = Anime;
