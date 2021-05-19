const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
//   "_id": "object ID",
//   "url": "Image Url",
//   "label": "label",
//   "user": {
//     "user_id": "user ID"
//     "username: "username"
  url: {
      type: String,
      required: true,
  },
  label: {
      stype: String,
      required: true,
  },

    }
);

module.exports = mongoose.model("Post", PostSchema);