const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
	date: {
		type: Date,
		requied: true
	},
	songs: [{ type: mongoose.Types.ObjectId }],
	tags: [{ type: String }]
});

const Service = new mongoose.model("Service", serviceSchema);

module.exports = Service;
