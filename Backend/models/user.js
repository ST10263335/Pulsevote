const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
organisationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation" },
role: { type: String, enum: ["admin", "manager", "user"], required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: [roleSchema]
});

module.exports = mongoose.model('User', userSchema);