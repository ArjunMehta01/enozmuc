const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	public_key: {
		type: String,
		default: ""
	},
	private_key: {
		type: String,
		default: ""
	},
	date: {
		type: Date,
		dafault: Date.now
	}
});

module.exports = User = mongoose.model("user", UserSchema);
