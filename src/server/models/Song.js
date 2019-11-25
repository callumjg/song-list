const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    url: {
      type: String,
      maxlength: 200,
      trim: true
    },
    author: {
      type: String,
      maxlength: 100
    },
    key: {
      type: String,
      maxlength: 5,
      trim: true
    },
    tempo: {
      type: String,
      maxlength: 10
    },
    tags: [
      {
        type: String,
        maxlength: 40
      }
    ],
    songSelectID: {
      type: String,
      maxlength: 20
    },
    notes: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const Song = new mongoose.model("Song", songSchema);
module.exports = Song;
