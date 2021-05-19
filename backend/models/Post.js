const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Post", PostSchema);
