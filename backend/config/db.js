const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (e) {
		console.error(e.message);
		process.exit(1);
	}
};

module.exports = connectDB;
